const fs = require('fs');
const path = require('path');
const examples = path.join(__dirname, 'src', 'examples');
let result;

function extractAll() {
    result = {};
    const dirs = fs.readdirSync(examples);

    for (let dir of dirs) {
        if (!fs.lstatSync(path.join(examples, dir)).isDirectory()) continue;
        const files = fs.readdirSync(path.join(examples, dir));

        for (let file of files) {
            if (file === `${dir}.js`) {
                try {
                    extractFrom(dir, file);
                } catch (e) {
                    console.log(`Error extracting code from ${file}`, e);
                }
            }
        }
    }
    
    fs.writeFileSync(path.join(__dirname, 'src', 'code.js'), `export default ${JSON.stringify(result, null, '\t')}`, 'utf8');
    console.log('wrote code.js');
}

function extractFrom(dir, file) {
    console.log('extractFrom', dir, file);

    const content = fs.readFileSync(path.join(examples, dir, file), 'utf8');
    const importRegex = /import[^'"]+['"]([^'"]+)['"];/gi;
    let match;

    (result[dir] = result[dir] || {})[file] = content;

    while (match = importRegex.exec(content)) {
        if (match[1].startsWith('./')) {
            let file = match[1].replace(/\.\//, '');

            if (!file.match(/\..*$/)) {
                file = file + '.js'
            }

            extractFrom(dir, file);
        }
    }
}

fs.watch(examples, { recursive: true }, extractAll);
extractAll();