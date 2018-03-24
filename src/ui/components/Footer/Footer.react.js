import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Icon from 'react-fontawesome';
import { Dropdown } from 'react-bootstrap';

import AppActions from '../../actions/AppActions';

import VolumeControl from './VolumeControl.react';
import ButtonShuffle from './ButtonShuffle.react';
import ButtonRepeat from './ButtonRepeat.react';

import Queue from '../Queue/Queue.react';

/*
|--------------------------------------------------------------------------
| 底部栏
|--------------------------------------------------------------------------
*/

class Footer extends Component {
  static propTypes = {
    playerStatus: PropTypes.string,
    queue: PropTypes.array,
    queueCursor: PropTypes.number,
    shuffle: PropTypes.bool,
    repeat: PropTypes.string,
  }

  constructor(props) {
    super(props);
  }

  

  render() {
    const { playerStatus, queue, queueCursor, shuffle, repeat } = this.props;
    
    // if(queueCursor === null) return null;

    return (
      <div className='footer'>
        
        <div className='controls-block'>
          <div className='controls-left'>
            <VolumeControl />
          </div>
        <div className='controls-center'>

         <ButtonRepeat repeat={this.props.repeat} />
          <button
            type='button'
            className='player-control previous'
            title='上一首'
            onClick={AppActions.player.previous}
           >
           <Icon name='backward' />
         </button>
         <button
            type='button'
            className='player-control play'
            title={this.props.playerStatus === '播放' ? '暂停' : '播放'}
            onClick={AppActions.player.playToggle}
         >
           <Icon name={this.props.playerStatus === 'play' ? 'pause' : 'play'}  />
         </button>
         <button
            type='button'
            className='player-control forward'
            title='下一首'
            onClick={AppActions.player.next}
        >
          <Icon name='forward' />
         </button>
         <ButtonShuffle shuffle={this.props.shuffle} />
        </div>

         <div className='controls-right'>
          <Dropdown id='queue-dropdown' className='queue-dropdown'>
            <Dropdown.Toggle noCaret>
              <Icon name='bars' />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Queue
                queue={this.props.queue}
                queueCursor={this.props.queueCursor}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  playerStatus: player.playerStatus,
  repeat: player.repeat,
  shuffle: player.shuffle,
  queue: player.queue,
  queueCursor: player.queueCursor,
});

export default connect(mapStateToProps)(Footer);
