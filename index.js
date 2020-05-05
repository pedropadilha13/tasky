const path = require('path');
const electron = require('electron');

const { app, ipcMain } = electron;

const MainWindow = require('./app/MainWindow');
const TimerTray = require('./app/TimerTray');

const isMac = process.platform === 'darwin';

let mainWindow;
let tray;

app.on('ready', () => {
  app.dock.hide();
  mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);

  const iconName = isMac ? 'iconTemplate.png' : 'windows-icon.png';
  const iconPath = path.join(__dirname, 'src', 'assets', iconName);
  tray = new TimerTray(iconPath, mainWindow);
});

ipcMain.on('update-timer', (event, timeLeft) => {
  tray.setTitle(timeLeft);
});
