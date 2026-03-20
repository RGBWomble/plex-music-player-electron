import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    show: false
  });
  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.loadURL(process.env.ELECTRON_START_URL || `file://${path.join(__dirname, '../renderer/out/index.html')}`);
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
