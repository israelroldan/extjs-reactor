const fs = require('fs');
const packagesDir = './packages';
const dirs = fs.readdirSync('./packages');
const path = require('path');
const { execSync } = require('child_process');

dirs.forEach(dir => updateToNext(path.join(packagesDir, dir)))

function updateToNext(dir) {
    const packageFile = path.join('.', dir, 'package.json');

    if (fs.existsSync(packageFile)) {
        const packageInfo = JSON.parse(fs.readFileSync(packageFile, 'utf8'));

        if (!packageInfo.dependencies) return;

        const extReactPackages = Object.keys(packageInfo.dependencies)
            .filter(name => name.match(/@extjs\/(ext-react|sencha-cmd)/))
            .map(name => `${name}@next`)

        if (extReactPackages.length) {
            const cmd = `npm i ${extReactPackages.join(' ')}`;
            console.log(`[${dir}] ${cmd}`);
            execSync(cmd, { cwd: dir });
        }
    }
}