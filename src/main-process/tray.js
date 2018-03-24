'use strict';

const os = require('os');

const { Tray, Menu, app, ipcMain } = require('electron');

class TrayManager {
  constructor(win, icon) {
    this.tray = null;
    this.trayIcon = icon;
    this.win = win;
    this.contextMenu;

    this.songDetails = [
      {
        label: '没有在播放',
        enabled: false,
      },
      {
        type: 'separator',
      },
    ];

    this.playToggle = [
      {
        label: '播放',
        click: () => {
          this.win.webContents.send('playerAction', 'play');
        },
      },
    ];

    this.pauseToggle = [
      {
        label: '暂停',
        click: () => {
          this.win.webContents.send('playerAction', 'pause');
        },
      },
    ];

    this.menu = [
      {
        label: '上一首',
        click: () => {
          this.win.webContents.send('playerAction', 'prev');
        },
      },
      {
        label: '下一首',
        click: () => {
          this.win.webContents.send('playerAction', 'next');
        },
      },
      {
        type: 'separator',
      },
      {
        label: '显示窗口',
        click: () => {
          this.win.show();
          this.win.focus();
        },
      },
      {
        type: 'separator',
      },
      {
        label: '退出',
        click: () => {
          app.quit();
          this.win.destroy();
        },
      },
    ];
  }

  bindEvents() {
    ipcMain.on('playerAction', (event, reply, data) => {
      switch(reply) {
        case 'play': {
          this.setContextMenu('play');
          break;
        }

        case 'pause': {
          this.setContextMenu('pause');
          break;
        }
        case 'trackStart': {
          this.updateTrayMetadata(data);
          this.setContextMenu('play');
          break;
        }
      }
    });
  }

  show() {
    this.tray = new Tray(this.trayIcon);

    this.tray.setToolTip('千千静听');

    if(os.platform() === 'win32') {
      this.tray.on('click', () => {
        this.win.show();
        this.win.focus();
      });
    } else if(os.platform() === 'darwin') {
      this.tray.on('double-click', () => {
        this.win.show();
        this.win.focus();
      });
    }

    this.setContextMenu('play');
  }

  setContextMenu(state) {
    const playPauseItem = state === 'play' ? this.pauseToggle : this.playToggle;
    const menuTemplate = [...this.songDetails, ...playPauseItem, ...this.menu];
    this.tray.setContextMenu(Menu.buildFromTemplate(menuTemplate));
  }


  updateTrayMetadata(metadata) {
    this.songDetails = [
      {
        label: `${metadata.title}`,
        enabled: false,
      },
      {
        label: `by ${metadata.artist}`,
        enabled: false,
      },
      {
        label: `on ${metadata.album}`,
        enabled: false,
      },
      {
        type: 'separator',
      },
    ];
  }
}

module.exports = TrayManager;
