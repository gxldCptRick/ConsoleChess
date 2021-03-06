import {app, BrowserWindow } from 'electron';
import path from 'path';
app.on('ready', () =>{
    let mainWindow = new BrowserWindow({
        minWidth: 800,
        minHeight: 500,
        width: 800,
        height: 500,
        maxWidth: 800,
        maxHeight: 500
    });
    mainWindow.loadFile(path.resolve(__dirname,'../electron-app-built/views/index.html'));
    mainWindow.on('close',() => {
        mainWindow = null;
    })
});

