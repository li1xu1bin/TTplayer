'use strict';

const { Menu, ipcMain, powerSaveBlocker, shell, app } = require('electron');

class IpcManager {
  constructor(window) {
    this.window = window;
    this.instance = {};
    this.forceQuit = false;
  }

  bindEvents() {
    ipcMain.on('tracksListContextMenu', (event, stringData) => {
      const data = JSON.parse(stringData);
      let playlistTemplate = [];
      let addToQueueTemplate = [];

      if(data.playlists) {
        playlistTemplate = [
          {
            label: '创建新歌单',
            click: () => {
              event.sender.send('tracksListContextMenuReply', 'createPlaylist');
            },
          },
        ];

        if(data.playlists.length > 0) {
          playlistTemplate.push(
            {
              type: 'separator',
            }
          );
        }

        data.playlists.forEach((elem) => {
          playlistTemplate.push({
            label: elem.name,
            click: () => {
              event.sender.send('tracksListContextMenuReply', 'addToPlaylist', {
                playlistId: elem._id,
              });
            },
          });
        });
      } else {
        playlistTemplate = [
          {
            label: '创建新歌单',
            click: () => {
              event.sender.send('tracksListContextMenuReply', 'createPlaylist');
            },
          },
          {
            type: 'separator',
          },
          {
            label: '没有歌单',
            enabled: false,
          },
        ];
      }

      if(data.playerStatus !== 'stop') {
        addToQueueTemplate = [
          {
            label: '添加到播放列表',
            click: () => {
              event.sender.send('tracksListContextMenuReply', 'addToQueue');
            },
          },
          {
            label: '下一首',
            click: () => {
              event.sender.send('tracksListContextMenuReply', 'playNext');
            },
          },
          {
            type: 'separator',
          },
        ];
      }

      const template = [
        {
          label: data.selectedCount > 1 ? `${data.selectedCount} tracks selected` : `${data.selectedCount} track selected`,
          enabled: false,
        },
        {
          type: 'separator',
        },
        ...addToQueueTemplate,
        {
          label: '添加到播放列表',
          submenu: playlistTemplate,
        },
        {
          type: 'separator',
        },
        {
          label: `搜索 "${data.track.artist[0]}"`,
          click: () => {
            event.sender.send('tracksListContextMenuReply', 'searchFor', { search: data.track.artist[0] });
          },
        },
        {
          label: `搜索 "${data.track.album}"`,
          click: () => {
            event.sender.send('tracksListContextMenuReply', 'searchFor', { search: data.track.album });
          },
        },
      ];

      if(data.type === 'playlist') template.push(
        {
          type: 'separator',
        },
        {
          label: '从歌单里移除',
          click: () => {
            event.sender.send('tracksListContextMenuReply', 'removeFromPlaylist');
          },
        }
      );

      template.push(
        {
          type: 'separator',
        },
        {
          label: '显示源文件',
          click: () => {
            shell.showItemInFolder(data.track.path);
          },
        },
        {
          label: '从歌库里移除',
          click: () => {
            event.sender.send('tracksListContextMenuReply', 'removeFromLibrary');
          },
        }
      );

      const context = Menu.buildFromTemplate(template);

      context.popup(this.window, { async: true }); // Let it appear
    });

    ipcMain.on('playlistContextMenu', (event, _id) => {
      const template = [
        {
          label: '删除',
          click: () => {
            event.sender.send('playlistContextMenuReply', 'delete', _id);
          },
        },
        {
          label: '重命名',
          click: () => {
            event.sender.send('playlistContextMenuReply', 'rename', _id);
          },
        },
      ];

      const context = Menu.buildFromTemplate(template);

      context.popup(this.window, { async: true }); // Let it appear
    });


    ipcMain.on('toggleSleepBlocker', (event, toggle, mode) => {
      if(toggle) {
        this.instance.sleepBlockerId = powerSaveBlocker.start(mode);
      } else {
        powerSaveBlocker.stop(this.instance.sleepBlockerId);
        delete(this.instance.sleepBlockerId);
      }
    });

    ipcMain.on('appRestart', () => {
      app.relaunch({ args: process.argv.slice(1) + ['--relaunch'] });
      app.exit(0);
    });


    this.window.on('closed', () => {
      // Dereference the window object
      this.window = null;
    });

    // Prevent the window to be closed, hide it instead (to continue audio playback)
    this.window.on('close', (e) => {
      if (this.forceQuit) {
        app.quit();
        this.window.destroy();
      } else {
        e.preventDefault();
        this.window.webContents.send('close');
      }
    });

    // Small hack to check on MacOS if the dock close action has been clicked
    // https://stackoverflow.com/questions/35008347/electron-close-w-x-vs-right-click-dock-and-quit#35782702
    app.on('before-quit', () => {
      this.forceQuit = true;
    });
  }
}

module.exports = IpcManager;
