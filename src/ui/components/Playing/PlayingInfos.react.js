import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { ProgressBar } from 'react-bootstrap';

import AppActions from '../../actions/AppActions';
import Player from '../../lib/player';
import utils from '../../utils/utils';

/*
|--------------------------------------------------------------------------
| 歌曲信息
|--------------------------------------------------------------------------
*/

class PlayingInfos extends React.Component {
  static propTypes = {
    trackPlaying: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      elapsed: 0,
      showTooltip: false,
      duration: null,
      x: null,
      dragging: false,
    };

    this.tick = this.tick.bind(this);

    this.dragOver = this.dragOver.bind(this);
    this.dragEnd = this.dragEnd.bind(this);

    this.jumpAudioTo = this.jumpAudioTo.bind(this);
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
  }

  componentDidMount() {
    Player.getAudio().addEventListener('timeupdate', this.tick);

    window.addEventListener('mousemove', this.dragOver);
    window.addEventListener('mouseup', this.dragEnd);
  }

  componentWillUnmount() {
    Player.getAudio().removeEventListener('timeupdate', this.tick);

    window.removeEventListener('mousemove', this.dragOver);
    window.removeEventListener('mouseup', this.dragEnd);
  }

  tick() {
    this.setState({ elapsed: Player.getCurrentTime() });
  }

  jumpAudioTo(e) {
    this.setState({ dragging: true });

    const { trackPlaying } = this.props;

    const bar = document.querySelector('.now-playing-bar');
    const percent = ((e.pageX - (bar.offsetLeft + bar.offsetParent.offsetLeft)) / bar.offsetWidth) * 100;

    const jumpTo = (percent * trackPlaying.duration) / 100;

    AppActions.player.jumpTo(jumpTo);
  }

  dragOver(e) {
    // Check if a currentTime update is needed
    if (this.state.dragging) {
      const { trackPlaying } = this.props;

      const playingBar = this.refs.playingBar;
      const playingBarRect = playingBar.getBoundingClientRect();

      const barWidth = playingBar.offsetWidth;
      const offsetX = Math.min(Math.max(0, e.pageX - playingBarRect.left), barWidth);

      const percent = offsetX / barWidth * 100;

      const jumpTo = (percent * trackPlaying.duration) / 100;

      AppActions.player.jumpTo(jumpTo);
    }
  }

  dragEnd() {
    if (this.state.dragging) {
      this.setState({ dragging: false });
    }
  }

  showTooltip(e) {
    const { trackPlaying } = this.props;

    const offsetX = e.nativeEvent.offsetX;
    const barWidth = e.currentTarget.offsetWidth;

    const percent = offsetX / barWidth * 100;

    const time = (percent * trackPlaying.duration) / 100;

    this.setState({
      duration: time,
      x: percent,
    });
  }

  hideTooltip() {
    this.setState({
      duration: null,
      x: null,
    });
  }

  render() {
    const { trackPlaying } = this.props;
    const elapsedPercent = this.state.elapsed * 100 / trackPlaying.duration;

    const nowPlayingTooltipClasses = classnames('playing-bar-tooltip', {
      hidden: this.state.duration === null,
    });

    return (
      <div className='now-playing-infos'>
        <div className='now-playing-metas'>
          <div className='metas'>
            <p className='meta-title'>
              {trackPlaying.title}
            </p>
            <p className='meta-artist'>
              {trackPlaying.artist.join(', ')}
            </p>
            <p className='meta-album'>
              {trackPlaying.album}
            </p>
          </div>

          
        </div>
        <div className='now-playing-bar' ref='playingBar'>
          <div className={nowPlayingTooltipClasses} style={{ left: `${this.state.x}%` }}>
            {utils.parseDuration(this.state.duration)}
          
          </div>
          <ProgressBar
            now={elapsedPercent}
            onMouseDown={this.jumpAudioTo}
            onMouseMove={this.showTooltip}
            onMouseLeave={this.hideTooltip}
          />
        </div>
      </div>
    );
  }
}

export default PlayingInfos;
