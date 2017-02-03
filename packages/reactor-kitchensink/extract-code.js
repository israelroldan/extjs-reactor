const fs = require('fs');
const path = require('path');
const examples = path.join(__dirname, 'src', 'examples');
let result;

function extractAll() {
    result = {};
    const dirs = fs.readdirSync(examples);

    for (let dir of dirs) {
        if (dir === 'index.js') continue;
        const files = fs.readdirSync(path.join(examples, dir));

        for (let file of files) {
            if (file === `${dir}.js`) {
                extractFrom(dir, file);
            }
        }
    }

    fs.writeFileSync(path.join(__dirname, 'src', 'code.js'), `export default ${JSON.stringify(result, null, '\t')}`, 'utf8');
    console.log('wrote code.js');
}

function extractFrom(dir, file) {
    const content = fs.readFileSync(path.join(examples, dir, file), 'utf8');
    const importRegex = /import .* from '([^']+)'/gi;
    let match;

    (result[dir] = result[dir] || []).push({ file, content });

    while (match = importRegex.exec(content)) {
        if (match[1].startsWith('./')) {
            extractFrom(dir, match[1].replace(/\.\//, '') + '.js');
        }
    }
}

fs.watch(examples, { recursive: true }, extractAll);
extractAll();