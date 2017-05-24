import extractFromTSX from './extractFromTSX';
import ReactExtJSWebpackPlugin = require('@extjs/reactor-webpack-plugin');

/**
 * Produces a minimal build of the Ext JS framework by crawling your React source code and extracting the xtypes used
 * in JSX tags
 */
export default class ReactExtJSWebpackTSPlugin extends ReactExtJSWebpackPlugin {

    getDefaultOptions() {
        return {
            ...super.getDefaultOptions(),
            test: /\.tsx?$/,
            manifestExtractor: extractFromTSX
        }
    }
    
};
