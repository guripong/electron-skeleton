// Modules to control application life and create native browser window
const {app, BrowserWindow,ipcMain,remote} = require('electron');
const path = require('path');
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';  //경고창 제거

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg+"가 왔음!!!!! 호를 보냄"); // "ping" 출력

  event.returnValue = '호';
})

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // "ping" 출력
  event.reply('asynchronous-reply', '힝')
})


let mainWindow;

function createWindow () {
  console.log("createWindow");
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile('html/index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    console.log("closeWindow");
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);


// Quit when all windows are closed.
app.on('window-all-closed', function () {
  console.log("window-all-closed");
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit();
});


app.on('activate', function () {
  console.log("activate");
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();

});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
