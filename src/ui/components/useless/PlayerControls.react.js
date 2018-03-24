import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Icon from 'react-fontawesome';

import VolumeControl from './VolumeControl.react';

import AppActions from '../../actions/AppActions';

/*
|--------------------------------------------------------------------------
| 底部控制栏
|--------------------------------------------------------------------------
*/

export default class PlayerControls extends PureComponent {
  static propTypes = {
    playerStatus: PropTypes.string,
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='controls-block'>
        <div className='controls-left'>
        <VolumeControl />
        </div>
        <div className='controls-center'>

        <button
          type='button'
          className='player-control previous'
          title='上一首'
          onClick={AppActions.player.previous}
        >
          <Icon name='backward' />
        </button>
        <button
          className='player-control play'
          title={this.props.playerStatus === '播放' ? '暂停' : '播放'}
          onClick={AppActions.player.playToggle}
        >
          <Icon name={this.props.playerStatus === 'play' ? 'pause' : 'play'} fixedWidth />
        </button>
        <button
          type='button'
          className='player-control forward'
          title='下一首'
          onClick={AppActions.player.next}
        >
          <Icon name='forward' />
        </button>
        </div>

         <div className='controls-right'>
        <NavLink
                to='/playing'
                activeClassName='active'
                className='title-link'
                title='Playing'
              >
            <Icon name='bars' />
        </NavLink>
        </div>
      </div>
    );
  }
}
