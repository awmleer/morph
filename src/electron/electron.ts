import { app, BrowserWindow, ipcMain } from 'electron';
import { client } from 'electron-connect';
import * as path from 'path';
import { environment } from '../environments/environment'

let applicationRef: Electron.BrowserWindow = null;

const debugMode = environment.debug;

const mainWindowSettings: Electron.BrowserWindowConstructorOptions = {
    width: 800,
    height: 550,
    frame: true,
    resizable: true
};

function initMainListener() {
    ipcMain.on('ELECTRON_BRIDGE_HOST', (event, data) => {
        // if (data === 'ping') {
        //     event.sender.send('ELECTRON_BRIDGE_CLIENT', 'pong');
        // }

    });
    ipcMain.on('enterFullScreen',(event,data)=>{
        console.log('got enterFullScreen event');
        applicationRef.setFullScreen(true);
        // event.returnValue=true;
    })
}

function createWindow() {
    applicationRef = new BrowserWindow(mainWindowSettings);
    applicationRef.loadURL(`file:///${__dirname}/../index.html`);
    applicationRef.webContents.openDevTools();
    if (debugMode) {
        // Open the DevTools.
        applicationRef.webContents.openDevTools();
    }
    applicationRef.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        applicationRef = null;
    });

    initMainListener();

    client.create(applicationRef);
}


app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        // TODO perhaps hook this and wait for message bus before quitting?
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (applicationRef === null) {
        createWindow();
    }
});
