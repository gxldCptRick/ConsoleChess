import path from 'path';
import nodeExternals from 'webpack-node-externals'
export default {
    target: 'node',
    entry: {
        app: [
            path.resolve(__dirname, "scripts/index.js")
        ] 
    },
    output: {
        path: path.resolve(__dirname),
        filename:'app.js'
    },
    plugins: [],
    externals: [nodeExternals()]

};