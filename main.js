
require('app-module-path').addPath(__dirname);

const electron = require("electron");
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
// Module to read and write JSON on file system
const Promise = require('bluebird');
const Storage = Promise.promisifyAll(require('electron-json-storage'));
// Module for all app constants
const CONST = require("core/constants");
// Class for default app
const App = require("core/app");

const path = require("path");
const url = require("url");
const config = require("core/config");
const _ = require("lodash");

// Keep a global reference of the window object, if you don"t, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function initApp(){
    console.log("initApp");

    console.log("Check for default app in storage");
    Storage.getAsync(CONST.STORAGE.DEFAULT_APP).then(
        (app)=>{
            if(_.isEmpty(app)){
                console.log("Default app isn't in storage => Create");

                let defaultApp = new App();
                Storage.setAsync(CONST.STORAGE.DEFAULT_APP, defaultApp).then(
                    ()=>{
                        // Start app
                        createWindow();
                    },
                    (err)=>{
                        alert(err);
                    }
                )
            }
            else {
                console.log("Default app is in storage => Start app");
                createWindow();
            }
        },
        (err)=>{
            alert(err);
        });
}

function createWindow() {
    console.log("createWindow");

    // Create the browser window.
    mainWindow = new BrowserWindow(config.window);

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "client/index.html"),
        protocol: "file:",
        slashes: true
    }));

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on("closed", function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", initApp);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit()
    }
});

app.on("activate", function () {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        initApp()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
