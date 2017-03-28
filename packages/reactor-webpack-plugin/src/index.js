'use strict';

import fs from 'fs';
import path from 'path';
import { sync as mkdirp } from 'mkdirp';
import extractFromJSX from './extractFromJSX';
import { sync as rimraf } from 'rimraf';
import { buildXML, createAppJson, createWorkspaceJson } from './artifacts';
import { execSync, spawn } from 'child_process';
import astring from 'astring';
import { transform } from 'babel-core';

let watching = false;

/**
 * Produces a minimal build of the Ext JS framework by crawling your React source code and extracting the xtypes used
 * in JSX tags
 */
module.exports = class ReactExtJSWebpackPlugin {

    /**
     * @param {Object[]} builds
     * @param {Boolean} [debug=false] Set to true to prevent cleanup of build temporary build artifacts that might be helpful in troubleshooting issues.
     * @param {String} sdk The full path to the Ext JS SDK
     * @param {String} [toolkit='modern'] "modern" or "classic"
     * @param {String} theme The name of the Ext JS theme package to use, for example "theme-material"
     * @param {String[]} packages An array of Ext JS packages to include
     * @param {String[]} overrides An array with the paths of directories or files to search. Any classes
     * declared in these locations will be automatically required and included in the build.
     * If any file defines an Ext JS override (using Ext.define with an "override" property),
     * that override will in fact only be included in the build if the target class specified
     * in the "override" property is also included.
     * @param {String} output The path to directory where the Ext JS bundle should be written
     * @param {Boolean} asynchronous Set to true to run Sencha Cmd builds asynchronously. This makes the webpack build finish much faster, but the app may not load correctly in your browser until Sencha Cmd is finished building the Ext JS bundle
     * @param {Boolean} production Set to true for production builds.  This tell Sencha Cmd to compress the generated JS bundle.
     */
    constructor({
        builds={},
        debug=false,
        watch=false,
        test=/\.jsx?$/,
        /* begin single build only */
        output='extjs',
        sdk,
        toolkit='modern',
        theme='theme-triton',
        packages=[],
        packageDirs=[],
        overrides=[],
        asynchronous=false,
        production=false
        /* end single build only */
    }) {
        if (Object.keys(builds).length === 0) {
            builds.ext = { sdk, toolkit, theme, packages, packageDirs, overrides, output };
        }

        for (let name in builds)
            this._validateBuildConfig(name, builds[name]);

        Object.assign(this, {
            output,
            builds,
            debug,
            watch,
            sdk,
            toolkit,
            theme,
            packages,
            packageDirs,
            overrides,
            dependencies: {},
            test,
            asynchronous,
            currentFile: null,
            production
        });

        this.manifest = null;
    }

    apply(compiler) {

        const me = this;

        /**
         * Adds the code for the specified function call to the manifest.js file
         * @param {Object} call A function call AST node.
         */
        const addToManifest = function(call) {
            try {
                const file = this.state.module.resource;
                let deps = me.dependencies[file];
                if (!deps) deps = me.dependencies[file] = [];
                deps.push(astring(call));
            } catch (e) {
                console.error(`Error processing ${file}`);
            }
        };

        compiler.plugin('watch-run', (watching, cb) => {
            this.watch = true;
            cb();
        });

        // extract xtypes from JSX tags
        compiler.plugin('compilation', (compilation, data) => {
            compilation.plugin('build-module', (module) => {
                this.currentFile = module.resource;

                if (module.resource && module.resource.match(this.test)) {
                    try {
                        if (this.debug) console.log(module.resource);
                        const contents = fs.readFileSync(module.resource, 'utf8');
                        const statements = extractFromJSX(contents);
                        this.dependencies[this.currentFile] = statements;
                    } catch (e) {
                        console.error('error parsing ' + this.currentFile);
                    }
                }
            });

            data.normalModuleFactory.plugin("parser", function(parser, options) {
                // extract xtypes and classes from Ext.create calls
                parser.plugin('call Ext.create', addToManifest);

                // copy Ext.require calls to the manifest.  This allows the users to explicitly require a class if the plugin fails to detect it.
                parser.plugin('call Ext.require', addToManifest);

                // copy Ext.define calls to the manifest.  This allows users to write standard Ext JS classes.
                parser.plugin('call Ext.define', addToManifest);
            })
        });

        // once all modules are processed, create the optimized Ext JS build.
        compiler.plugin('emit', (compilation, callback) => {
            const modules = compilation.chunks.reduce((a, b) => a.concat(b.modules), []);
            const build = this.builds[Object.keys(this.builds)[0]];

            let outputPath = path.join(compiler.outputPath, this.output);

            // webpack-dev-server overwrites the outputPath to "/", so we need to prepend contentBase
            if (compiler.outputPath === '/' && compiler.options.devServer) {
                outputPath = path.join(compiler.options.devServer.contentBase, outputPath);
            }

            // the following is needed for html-webpack-plugin to include <script> and <link> tags for Ext JS
            const jsChunk = compilation.addChunk(`${this.output}-js`);

            jsChunk.hasRuntime = jsChunk.isInitial = () => true;
            jsChunk.files.push(path.join(this.output, 'ext.js'));
            jsChunk.files.push(path.join(this.output, 'ext.css'));
            jsChunk.id = -2; // this forces html-webpack-plugin to include ext.js first

            if (this.asynchronous) callback();

            this._buildExtBundle('ext', modules, outputPath, build)
                .then(() => {
                    const cssVarPath = path.join(this.output, 'css-vars.js');
                    console.log("\n Checking for path " + cssVarPath + "\n");
                    if (fs.existsSync(path.join(outputPath, 'css-vars.js'))) {
                        console.log("\n Found path " + cssVarPath + "\n");
                        const cssVarChunk = compilation.addChunk(`${this.output}-css-vars`);
                        cssVarChunk.hasRuntime = cssVarChunk.isInitial = () => true;
                        cssVarChunk.files.push(cssVarPath);
                        cssVarChunk.id = -1;
                    }
                    !this.asynchronous && callback();
                })
                .catch(e => {
                    console.error(e);
                    compilation.errors.push(new Error('[@extjs/reactor-webpack-plugin]: ' + e.toString()));
                });
        });
    }

    /**
     * Checks each build config for missing/invalid properties
     * @param {String} name The name of the build
     * @param {String} build The build config
     * @private
     */
    _validateBuildConfig(name, build) {
        const { sdk } = build;
        if (!sdk) throw new Error(`Missing required option sdk in build ${name}.  This must be the path to your Ext JS SDK.`);
    }

    /**
     /**
     * Builds a minimal version of the Ext JS framework based on the classes used
     * @param {String} name The name of the build
     * @param {Module[]} modules webpack modules
     * @param {String} output The path to where the framework build should be written
     * @param {String} [toolkit='modern'] "modern" or "classic"
     * @param {String} output The path to the directory to create which will contain the js and css bundles
     * @param {String} theme The name of the Ext JS theme package to use, for example "theme-material"
     * @param {String[]} packages An array of Ext JS packages to include
     * @param {String[]} packageDirs Directories containing packages
     * @param {String[]} overrides An array of locations for overrides
     * @param {String} sdk The full path to the Ext JS SDK
     * @private
     */
    _buildExtBundle(name, modules, output, { toolkit='modern', theme, packages=[], packageDirs=[], sdk, overrides }) {
        return new Promise((resolve, reject) => {
            this.onBuildComplete = resolve;
            this.onBuildFail = reject;

            if (!watching) {
                rimraf(output);
                mkdirp(output);
            }

            let statements = ['Ext.require(["Ext.app.Application", "Ext.Component", "Ext.Widget"])']; // for some reason command doesn't load component when only panel is required

            for (let module of modules) {
                const deps = this.dependencies[module.resource];
                if (deps) statements = statements.concat(deps);
            }

            const js = transform(statements.join(';\n'), {
                presets: ['es2015'],
                plugins: ['transform-object-rest-spread']
            }).code;

            const manifest = path.join(output, 'manifest.js');

            if (fs.existsSync(path.join(sdk, 'ext'))) {
                // local checkout of the SDK repo
                packageDirs.push(path.join('ext', 'packages'));
                sdk = path.join(sdk, 'ext');
            }

            if (!watching) {
                fs.writeFileSync(path.join(output, 'build.xml'), buildXML({ compress: this.production }), 'utf8');
                fs.writeFileSync(path.join(output, 'app.json'), createAppJson({ theme, packages, toolkit, overrides, packageDirs }), 'utf8');
                fs.writeFileSync(path.join(output, 'workspace.json'), createWorkspaceJson(sdk, output), 'utf8');
            }

            let cmdRebuildNeeded = false;

            if (this.manifest === null || js !== this.manifest) {
                // Only write manifest if it differs from the last run.  This prevents unnecessary cmd rebuilds.
                this.manifest = js;
                fs.writeFileSync(manifest, js, 'utf8');
                cmdRebuildNeeded = true;
                console.log(`\nbuilding Ext JS bundle: ${name} => ${output}`);
            }

            if (this.watch) {
                if (!watching) {
                    watching = spawn('sencha', ['ant', 'watch'], { cwd: output });
                    watching.stdout.pipe(process.stdout);
                    watching.stdout.on('data', data => {
                        if (data.toString().match(/Waiting for changes\.\.\./)) {
                            this.onBuildComplete(output);
                        }
                    });
                    watching.on('exit', code => this.onBuildFail())
                }

                if (!cmdRebuildNeeded) resolve(output);
            } else {
                execSync('sencha ant build', { cwd: output, stdio: 'inherit' });
                resolve(output);
            }
        });
    }

};


