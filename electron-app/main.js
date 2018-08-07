import {app, BrowserWindow } from 'electron';
import path from 'path';
app.on('ready', () =>{
    let mainWindow = new BrowserWindow({
        width: 430,
        minWidth: 430,
        maxWidth: 800,
        minHeight: 470,
        height: 470,
        maxHeight: 960
    });
    
    mainWindow.loadFile(path.resolve(__dirname,'../electron-app-built/views/index.html'));
    
    mainWindow.on('close',() => {
        mainWindow = null;
    })
});

