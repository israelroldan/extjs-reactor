#!/usr/bin/env node

const parseArgs = require('minimist'),
    fs = require('fs'),
    path = require('path'),
    { exec } = require('child_process');

// A skeleton for a ext-react workspace.json file.
const workspaceJson = {
    apps: [],
    frameworks: { ext: 'node_modules/@extjs/ext-react' },
    build: { dir: '${workspace.dir}/build/.sencha' },
    packages: {
        dir: '${workspace.dir}/packages,${workspace.dir}/packages/local',
        extract: '${workspace.dir/packages/remote'
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
        * --baseTheme -b - The theme to base your custom theme off of.
        * --name -n - The name of the theme package.
`
    );
}

// Validate sencha Cmd in path.
const sencha = 'node_modules/.bin/sencha';

/**
 * Generates a workspace in the current directory (by writing a workspace.json file).
 */
const generateWorkspace = () => {
    console.log('Generating Sencha workspace...');
    return new Promise((resolve, reject) => {
        fs.writeFile(path.join('.', 'workspace.json'), JSON.stringify(workspaceJson, null, 4), err => {
            if(err) return reject(err);
            return resolve();
        });
    });
}

/**
 * Checks if a workspace exists in the current directory.
 * @returns Boolean
 */
const workspaceExists = () => {
    try {
        return fs.accessSync(path.join('.', 'workspace.json'));
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
        const proc = exec([
            sencha,
            'generate', 'package',
            '--type', 'THEME',
            '--extend', config.baseTheme || 'theme-material',
            '--framework', 'ext',
            '--name', config.name
        ].join(' '));

        proc.once('close', resolve.bind(null));
        proc.stdout.on('data', console.log.bind(console));
        proc.stderr.on('data', console.error.bind(console));

        return proc;
    });
}

/**
 * Applies a theme based on `name` property in config object to current app by writing to a .sencharc file.
 */
const applyTheme = config => {
    console.log('Applying theme to current app...');
    return new Promise((resolve, reject) => {
        fs.writeFile('.sencharc', JSON.stringify({
            theme: path.join('.', 'packages', config.name)
        }, null, 4), err => {
            if(err) return reject(err);
            else    return resolve();
        });
    });
}

// Parse the arguments passed from command-line using minimist.
const args = parseArgs(process.argv.slice(2), {
    string: ['name', 'baseTheme'],
    default: { baseTheme: 'theme-material' },
    alias: {
        baseTheme: ['base', 'b'],
        name: 'n'
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

        return (workspaceExists() ? Promise.resolve([]) : generateWorkspace(args))
            .then(generateTheme.bind(null, args))
            .then(applyTheme.bind(null, args));
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