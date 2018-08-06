import {app, BrowserWindow } from 'electron';
import path from 'path';
app.on('ready', () =>{
    let mainWindow = new BrowserWindow({
        width: 500,
        height: 600
    });
    
    mainWindow.loadFile(path.resolve(__dirname,'../electron-app-built/views/index.html'));
    
    mainWindow.on('close',() => {
        mainWindow = null;
    })
});

