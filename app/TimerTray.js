const { app, Menu, Tray } = require('electron');
const isMac = process.platform === 'darwin';

class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);
    this.setToolTip('Timer App');

    this.mainWindow = mainWindow;
    this.on('click', this.onClick.bind(this));
    this.on('right-click', this.onRightClick.bind(this));
  }

  onClick(events, { x, y }) {
    const { height, width } = this.mainWindow.getBounds();

    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      this.mainWindow.setBounds({
        x: x - width / 2,
        y: isMac ? y : y - height,
        height,
        width
      });
      this.mainWindow.show();
    }
  }

  onRightClick() {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: () => app.quit()
      }
    ]);
    this.popUpContextMenu(menuConfig);
  }
}

module.exports = TimerTray;
