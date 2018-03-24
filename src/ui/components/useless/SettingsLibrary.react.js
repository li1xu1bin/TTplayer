import electron from 'electron';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button } from 'react-bootstrap';

import Dropzone from '../Shared/Dropzone.react';

import AppActions from '../../actions/AppActions';

const dialog = electron.remote.dialog;


/*
|--------------------------------------------------------------------------
| Child - SettingsLibrary - manage import folders for library
|--------------------------------------------------------------------------
*/

export default class SettingsLibrary extends Component {
  static propTypes = {
    config: PropTypes.object,
    library: PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

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

  render() {
    return (
      <div className='setting settings-musicfolder'>
        <div className='setting-section'>
          <h4>管理歌库</h4>
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
    );
  }
}
