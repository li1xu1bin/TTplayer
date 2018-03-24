import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppActions from '../../actions/AppActions';


/*
|--------------------------------------------------------------------------
| Child - Audio settings
|--------------------------------------------------------------------------
*/

export default class SettingsAudio extends Component {
  static propTypes = {
    config: PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  setPlaybackRate(e) {
    AppActions.player.setPlaybackRate(e.currentTarget.value);
  }

  render() {
    const config = this.props.config;

    return (
      <div className='setting setting-audio'>
        <div className='setting-section'>
          <h4>播放速率</h4>
          <div className='formGroup'>
            <label>
              数值为2，播放速度为2倍
            </label>
            <input type='number'
              className='form-control'
              defaultValue={config.audioPlaybackRate}
              onChange={this.setPlaybackRate}
              min='0.5'
              max='5'
              step='0.1'
            />
          </div>
        </div>
      </div>
    );
  }
}
