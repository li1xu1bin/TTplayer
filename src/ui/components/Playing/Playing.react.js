import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PlayingInfos from './PlayingInfos.react';
import PlayingSpectrum from './PlayingSpectrum.react';
import Cover from './Cover.react';
import FullViewMessage from '../Shared/FullViewMessage.react';


/*
|--------------------------------------------------------------------------
| 播放主页
|--------------------------------------------------------------------------
*/

class Playing extends Component {
  static propTypes = {
    playerStatus: PropTypes.string,
    queue: PropTypes.array,
    queueCursor: PropTypes.number,
    spectrumStyle: PropTypes.bool,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { playerStatus, queue, queueCursor, spectrumStyle } = this.props;

    // if(queueCursor === null) return null;

    //定义正在播放的歌曲
    const trackPlaying = queue[queueCursor];
    
    let playingContent;

    if(queueCursor === null) {
      playingContent = (
        <FullViewMessage>
          <p>没有正在播放的音乐</p>
        </FullViewMessage>
      );
    }else{
      playingContent = (
        <div>
          <PlayingSpectrum 
            playerStatus={playerStatus}
            spectrumStyle={spectrumStyle}
          />
          <div className='now-playing' >
            <div className='now-playing-cover'>
              <Cover path={trackPlaying.path} />
            </div>
            <PlayingInfos
              trackPlaying={trackPlaying}
            />
          </div>
        </div>
      );
    }

    return (
      <div className='view view-playing'>
        { playingContent }
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  playerStatus: player.playerStatus,
  queue: player.queue,
  queueCursor: player.queueCursor,
});

export default connect(mapStateToProps)(Playing);
