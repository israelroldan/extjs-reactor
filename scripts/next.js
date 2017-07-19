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

        Object.keys(packageInfo.dependencies)
            .forEach((name) => {
                if (name.match(/@extjs\/(ext-react|sencha-cmd).*/)) {
                    packageInfo.dependencies[name] = 'next';
                }
            });
        
        fs.writeFileSync(packageFile, JSON.stringify(packageInfo, null, 2));
    }
}
