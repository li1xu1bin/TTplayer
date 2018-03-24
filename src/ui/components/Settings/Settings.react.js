import electron from 'electron';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ButtonGroup, Button } from 'react-bootstrap';

import Dropzone from './Dropzone.react';
import CheckboxSetting from './CheckboxSetting.react';

import { config } from '../../lib/app';
import AppActions from '../../actions/AppActions';

const dialog = electron.remote.dialog;

/*
|--------------------------------------------------------------------------
| 设置主页
|--------------------------------------------------------------------------
*/

class Settings extends Component {
  static propTypes = {
    config: PropTypes.object,
    library: PropTypes.object,
    children: PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  //重置歌库
  resetLibrary() {
    AppActions.player.stop();
    AppActions.library.reset();
  }

  onDrop(e) {
    const files = [];
    const eventFiles = e.dataTransfer.files;

    for(let i = 0; i < eventFiles.length; i++) {
      files.push(eventFiles[i].path);
    }

    AppActions.library.add(files);
  }

  openFolderSelector() {
    dialog.showOpenDialog({
      properties: ['multiSelections', 'openDirectory'],
    }, (result) => {
      if(result) {
        AppActions.library.add(result);
      }
    });
  }
  //播放速度 
  setPlaybackRate(e) {
    AppActions.player.setPlaybackRate(e.currentTarget.value);
  }

  render() {
    const { library } = this.props;
    const conf = config.getAll();

    return (
      <div className='view view-settings'>

       <div className='setting settings-musicfolder'>
          <h4>管理歌库</h4>
          <div className='setting-block'>
          <Dropzone
            title='添加音乐'
            subtitle='拖动文件/文件夹到这里'
            onDrop={this.onDrop}
            onClick={this.openFolderSelector}
          />
          <ButtonGroup>
            <Button
              bsSize='small'
              bsStyle='danger'
              title='重置歌库'
              disabled={this.props.library.refreshing}
              onClick={this.resetLibrary}
            >
                          重置歌库
            </Button>
          </ButtonGroup>
          </div>
       </div>

       <div className='setting setting-audio'>
          <h4>播放速率</h4>
          <div className='setting-block'>
            <label>
              数值为2，播放速度为2倍
            </label>
            <input type='number'
              className='form-control'
              defaultValue={conf.audioPlaybackRate}
              onChange={this.setPlaybackRate}
              min='0.5'
              max='5'
              step='0.1'
            />
          </div>
       </div>

       <div className='setting setting-interface'>
        <h4>播放器设置</h4>
        <div className='setting-block '>

        <CheckboxSetting
          title='黑暗模式'
          description=''
          defaultValue={conf.theme === 'dark'}
          onClick={AppActions.settings.toggleDarkTheme}
        />
        <CheckboxSetting
          title='允许通知'
          description=''
          defaultValue={conf.displayNotifications}
          onClick={AppActions.settings.toggleDisplayNotifications}
        />
        <CheckboxSetting
          title='原生模式'
          description=''
          defaultValue={conf.useNativeFrame}
          onClick={AppActions.settings.toggleNativeFrame}
        />
        {/* <CheckboxSetting
          title='阻止睡眠'
          description=''
          defaultValue={conf.sleepBlocker}
          onClick={AppActions.settings.toggleSleepBlocker}
        /> */}
        <CheckboxSetting
          title='最小到托盘'
          description=''
          defaultValue={conf.minimizeToTray}
          onClick={AppActions.settings.toggleMinimizeToTray}
        />
        {/* <CheckboxSetting
          title='检查更新'
          description=''
          defaultValue={conf.autoUpdateChecker}
          onClick={AppActions.settings.toggleAutoUpdateChecker}
        /> */}
         <CheckboxSetting
          title='开发者模式'
          defaultValue={conf.devMode}
          onClick={AppActions.settings.toggleDevMode}
        />
        </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = (({ library }) => ({ library }));

export default connect(mapStateToProps)(Settings);
