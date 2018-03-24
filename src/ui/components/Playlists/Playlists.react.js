import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';

import PlaylistsNav from './PlaylistsNav.react';
import FullViewMessage from '../Shared/FullViewMessage.react';

import AppActions from '../../actions/AppActions';
import Playlist from './Playlist.react';


/*
|--------------------------------------------------------------------------
| 播放列表主页
|--------------------------------------------------------------------------
*/

class Playlists extends Component {
  static propTypes = {
    params: PropTypes.object,
    playlists: PropTypes.array,
    playerStatus: PropTypes.string,
    match: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.autoRedirect = this.autoRedirect.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this);
  }

  createPlaylist() {
    AppActions.playlists.create('新建歌单', true);
  }

  autoRedirect() {
    const { playlistId } = this.props.match.params;

    // If there is not playlist selected, redirect to the first one
    if (!playlistId) {
      return <Redirect to={`/playlists/${this.props.playlists[0]._id}`} />;
    }

    // Maybe this id does not exist in the library anymore
    // (after deleting a library for example)
    const { playlists } = this.props;

    if (playlists.every((elem) => elem._id !== playlistId)) {
      if (playlists.length === 0) {
        <Redirect to='/playlists' />;
      }

      return <Redirect to={`/playlists/${this.props.playlists[0]._id}`} />;
    }

    return null;
  }

  render() {
    const { playlists } = this.props;
    let playlistContent;

    if(playlists === null) {
      playlistContent = (
        <FullViewMessage>
          <p>加载歌单。。</p>
        </FullViewMessage>
      );
    } else if(playlists.length === 0) {
      playlistContent = (
        <FullViewMessage>
          <p>没有歌单</p>
          <p className='sub-message'>
            <a onClick={this.createPlaylist}>新建歌单</a>
          </p>
        </FullViewMessage>
      );
    } else {
      playlistContent = (
        <React.Fragment>
          <Route path="/playlists" render={this.autoRedirect} />
          <Route path='/playlists/:playlistId' component={Playlist} />
        </React.Fragment>
      );
    }

    return (
      <div className='view view-playlists'>
        <PlaylistsNav playlists={playlists} />
        <div className='playlist'>
          { playlistContent }
        </div>
      </div>
    );
  }
}


const mapStateToProps = ({ playlists, player }) => ({
  playlists,
  playerStatus: player.playerStatus,
});


export default withRouter(connect(mapStateToProps)(Playlists));
