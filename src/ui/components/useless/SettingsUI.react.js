import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppActions from '../../actions/AppActions';

import CheckboxSetting from './CheckboxSetting.react';


/*
|--------------------------------------------------------------------------
| Child - UI Settings
|--------------------------------------------------------------------------
*/

export default class SettingsUI extends Component {
  static propTypes = {
    config: PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const config = this.props.config;

    return (
      <div className='setting setting-interface'>
        <CheckboxSetting
          title='黑暗模式'
          description=''
          defaultValue={config.theme === 'dark'}
          onClick={AppActions.settings.toggleDarkTheme}
        />
        <CheckboxSetting
          title='允许通知'
          description=''
          defaultValue={config.displayNotifications}
          onClick={AppActions.settings.toggleDisplayNotifications}
        />
        <CheckboxSetting
          title='原生模式'
          description=''
          defaultValue={config.useNativeFrame}
          onClick={AppActions.settings.toggleNativeFrame}
        />
        <CheckboxSetting
          title='阻止睡眠'
          description=''
          defaultValue={config.sleepBlocker}
          onClick={AppActions.settings.toggleSleepBlocker}
        />
        <CheckboxSetting
          title='最小到托盘'
          description=''
          defaultValue={config.minimizeToTray}
          onClick={AppActions.settings.toggleMinimizeToTray}
        />
        <CheckboxSetting
          title='检查更新'
          description=''
          defaultValue={config.autoUpdateChecker}
          onClick={AppActions.settings.toggleAutoUpdateChecker}
        />
         <CheckboxSetting
          title='开发者模式'
          defaultValue={config.devMode}
          onClick={AppActions.settings.toggleDevMode}
        />
      </div>
    );
  }
}
