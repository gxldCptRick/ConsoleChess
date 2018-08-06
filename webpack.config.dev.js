import path from 'path';
import nodeExternals from 'webpack-node-externals'
export default {
    target: 'node',
    entry: {
        app: [
            path.resolve(__dirname, "scripts/electron-app/main.js")
        ] 
    },
    mode: "development",
    output: {
        path: path.resolve(__dirname, "scripts/electron-app/"),
        filename:'app.js'
    },
    plugins: [],
    externals: [nodeExternals()]

};