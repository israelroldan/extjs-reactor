'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const glob = require('glob');
const path = require('path');
const boilerplate = path.join(__dirname, '..', '..', 'node_modules', '@extjs', 'reactor-boilerplate');
const fs = require('fs');
const { kebabCase } = require('lodash')

module.exports = class extends Generator {

    prompting_name() {
        this.log(
            '\n' + chalk.bold.underline('Welcome to the ExtReact app generator') +            
            '\n' +
            `\nWe're going to create a new ${chalk.bold('React')} app that uses ${chalk.bold('Sencha ExtReact')} components.` +
            '\n'
        );

        return this.prompt([{
            type: 'input',
            name: 'appName',
            message: 'What would you like to name your app?',
            default: 'My ExtReact App'
        }]).then(props => Object.assign(this, props));
    }

    prompting_choices() {
        const prompts = [{
            type: 'input',
            name: 'packageName',
            message: 'What would you like to name the npm package?',
            default: kebabCase(this.appName)
        }, {
            type: 'list',
            name: 'baseTheme',
            message: 'What theme would you like to use?',
            choices: ['material', 'triton', 'ios']
        }, {
            type: 'confirm',
            name: 'createDirectory',
            message: 'Would you like to create a new directory for your project?',
            default: true
        }];

        return this.prompt(prompts).then(props => Object.assign(this, props));
    }

    writing() {
        if (this.createDirectory) {
            this.destinationRoot(this.packageName);
        }

        // copy in files from reactor-boilerplate
        glob.sync('**/*', { cwd: boilerplate, ignore: ['build/**', 'node_modules/**'], dot: true })
            .forEach(file => new Promise((resolve, reject) => {
                this.fs.copy(path.join(boilerplate, file), file);
            }))

        const packageInfo = this.fs.readJSON('package.json');

        // set base theme

        this.baseTheme = `theme-${this.baseTheme}`;
        const theme = path.join('ext-react', 'packages', 'custom-ext-react-theme', 'package.json');
        const themePackageJson = this.fs.read(theme).replace('theme-material', this.baseTheme);
        this.fs.write(theme, themePackageJson);

        // update package.json

        delete packageInfo.author;
        delete packageInfo.repository;
        delete packageInfo.private;
        delete packageInfo.description;
        delete packageInfo.license;

        Object.assign(packageInfo, {
            name: this.packageName
        });

        if (this.baseTheme !== 'theme-material') {
            packageInfo.dependencies[`@extjs/ext-react-${this.baseTheme}`] = packageInfo.dependencies['@extjs/ext-react'];
        }

        this.fs.writeJSON('package.json', packageInfo, null, '  ');

        // update index.html

        const indexHtml = path.join('src', 'index.html');
        this.fs.write(indexHtml, this.fs.read(indexHtml).replace('ExtReact Boilerplate', this.appName));

        // update Layout.js
        
        const layout = path.join('src', 'Layout.js');
        this.fs.write(layout, this.fs.read(layout).replace('ExtReact Boilerplate', this.appName));
    }

    install() {
        this.npmInstall();
    }

    end() {
		const chdir = this.createDirectory ? '"cd ' + this.packageName + '" then ' : '';
		
        this.log(
			'\n' + chalk.green.underline('Your new ExtReact app is ready!') +
			'\n' +
			'\nType ' + chdir + '"npm start" to run the development build and open your new app in a web browser.' +
			'\n'
		);
	}

};
