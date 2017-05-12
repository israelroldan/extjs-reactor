#!/usr/bin/env node

const parseArgs = require('minimist'),
    fs = require('fs'),
    path = require('path'),
    sencha = require('@extjs/sencha-cmd'),
    { fork } = require('child_process'), 
    mkdirp = require('mkdirp');

console.log('USING sencha: ', sencha);
// A skeleton for a ext-react workspace.json file.
const workspaceJson = {
    apps: [],
    frameworks: { ext: '../node_modules/@extjs/ext-react' },
    build: { dir: '${workspace.dir}/build' },
    packages: { dir: '${workspace.dir}/packages,${workspace.dir}/../node_modules/@extjs' },
    properties: {
        'build.web.root': '${workspace.dir}/../'
    }
};

/**
 * Prints usage for using this CLI.
 */
printUsage = () => {
    console.log(
`
    ext-react CLI currently offers a method for generating a theme for ext-react apps (SASS based system).

    An example usage is:
        ext-react generate theme --baseTheme theme-material --name my-awesome-theme

    Options
        * --name -n - The name of the theme package.
        * --baseTheme -b - (Optional) The theme to base your custom theme off of. Defaults to 'theme-material'.
`
    );
}

/**
 * Ensures a 'ext-react/packages' folder exists for the workspace and theme packages to be installed in.
 */
const ensurePackagesFolder = () => {
    return new Promise(resolve => {
        const dir = path.join('.', 'ext-react', 'packages');
        fs.stat(dir, (err, stats) => {
            if(err || !stats.isDirectory()) {
                mkdirp(dir, resolve.bind(null));
            } else {
                resolve();
            }
        })
    });
}

/**
 * Generates a workspace in the current directory (by writing a workspace.json file).
 */
const generateWorkspace = () => {
    return ensurePackagesFolder().then(() => {
        return new Promise((resolve, reject) => {
            if(!workspaceExists()) {
                console.log('Generating Sencha workspace...');
                fs.writeFile(path.join('.', 'ext-react', 'workspace.json'), JSON.stringify(workspaceJson, null, 4), err => {
                    if(err) return reject(err);
                    return resolve();
                });
            } else {
                console.log('Using existing workspace at ext-react/workspace.json');
                return resolve();
            }
        }); 
    });
}

/**
 * Checks if a workspace exists in the current directory.
 * @returns Boolean
 */
const workspaceExists = () => {
    try {
        return fs.statSync(path.join('.', 'ext-react', 'workspace.json')).isFile();
    } catch(e) {
        return false;
    }
}

/**
 * Generates a theme package with provided arguments in config object (name and baseTheme).
 * @param {*} config 
 */
const generateTheme = config => {
    console.log('Generating theme package...');
    return new Promise(resolve => {
        const proc = fork(sencha, [
            'generate', 'package',
            '--type', 'THEME',
            '--extend', config.baseTheme || 'theme-material',
            '--framework', 'ext',
            '--name', config.name
        ], { cwd: path.join('.', 'ext-react'), silent: true });

        proc.once('exit', code => code > 0 ? reject(`Generating package failed with code: ${code}`) : resolve());
        proc.stdout.pipe(process.stdout);
        proc.stderr.pipe(process.stderr);

        return proc;
    });
}

/**
 * Applies a theme based on `name` property in config object to current app by writing to a .sencharc file.
 */
const applyTheme = config => {
    console.log('Applying theme to current app...');
    return new Promise((resolve, reject) => {
        fs.writeFile('.ext-reactrc', JSON.stringify({
            theme: path.join('.', 'ext-react', 'packages', config.name)
        }, null, 4), err => {
            if(err) return reject(err);
            else    return resolve();
        });
    });
}

// Parse the arguments passed from command-line using minimist.
const args = parseArgs(process.argv.slice(2), {
    string: ['name', 'baseTheme'],
    boolean: ['apply'],
    default: { baseTheme: 'theme-material' },
    alias: {
        baseTheme: ['base', 'b'],
        name: 'n',
        apply: 'a'
    }
});

/**
 * Evaluate the first 2 arguments to see what to do.
 */
switch(args._.join(' ')) {
    case 'generate workspace': {
        return generateWorkspace(args);
    }
    case 'generate theme': {
        if(!args.name) {
            console.error('Missing required argument: --name');
            return printUsage();
        }

        return generateWorkspace(args)
            .then(generateTheme.bind(null, args))
            .then((args.apply ? applyTheme.bind(null, args) : Promise.resolve([])))
            .then(() => {
                console.log(`Theme created at: ext-react/packages/${args.name}`);
            })
            .catch(error => {
                console.error('Error encountered.', error);
            })
    }
    case 'apply theme': {
        if(!args.name) {
            console.error('Missing required argument: --name');
            return printUsage();
        }

        return applyTheme(args);
    }
    default: {
        // TODO: Print usage here.
        printUsage();
    }
}