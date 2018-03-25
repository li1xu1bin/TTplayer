import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from 'react-fontawesome';


/*
|--------------------------------------------------------------------------
| 歌曲频谱
|--------------------------------------------------------------------------
*/

class PlayingSpectrum extends Component {
  static propTypes = {
    playerStatus: PropTypes.string,
  }

  constructor(props) {
    super(props);
    
    this.state = { 
      spectrumStyle: false,
    };

    this.toggleSpectrum = this.toggleSpectrum.bind(this);
  }
  toggleSpectrum() {
    this.setState({
      spectrumStyle: !this.state.spectrumStyle,
    });

    // switch(this.state.spectrumStyle) {
    //   case 'none':
    //     this.setState({
    //       spectrumStyle: 'wave'
    //     });
    //     break;
    //   case 'wave':
    //     this.setState({
    //       spectrumStyle: 'curve'
    //     });
    //     break;
    //   case 'curve':
    //     this.setState({
    //       spectrumStyle: 'none'
    //     });
    //     break;
    // }
  }

  render() {
    // const { playerStatus } = this.props;
    const activeStatus = classnames('playing-wave', {
      running: this.props.playerStatus === 'play',
    });

    let playingStyle;
    
  
    if(this.state.spectrumStyle) {
      playingStyle = (
        <div className={activeStatus} >
          <div className="rectangle-1" />
          <div className="rectangle-2" />
          <div className="rectangle-3" />
          <div className="rectangle-4" />
          <div className="rectangle-5" />
          <div className="rectangle-6" />
          <div className="rectangle-5" />
          <div className="rectangle-4" />
          <div className="rectangle-3" />
          <div className="rectangle-2" />
          <div className="rectangle-1" />
        </div>
      );
    } else{
      playingStyle = (

        <div className='blank' />
      );
    }

    return (
      <div className='playing-spectrum' >
        { playingStyle }
        <button
          type='button'
          className='player-control plug'
          title='特效'
          onClick={this.toggleSpectrum}
        >
          <Icon name='plug' />
        </button>
      </div>
    );
  }
}
// const mapStateToProps = ({ styleType }) => ({
//   styleType: PropTypes.string,
// });

export default PlayingSpectrum;
