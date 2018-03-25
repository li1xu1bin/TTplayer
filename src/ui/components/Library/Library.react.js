import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FullViewMessage from '../Shared/FullViewMessage.react';
import TracksList from '../Shared/TracksList.react';
import { filterTracks, sortTracks } from '../../utils/utils-library';
import * as SORT_ORDERS from '../../constants/sort-orders';


/*
|--------------------------------------------------------------------------
| 歌库
|--------------------------------------------------------------------------
*/

class Library extends Component {
  static propTypes = {
    library: PropTypes.object,
    playlists: PropTypes.array,
    playerStatus: PropTypes.string,
    queue: PropTypes.any,
  }

  constructor(props) {
    super(props);
  }

  getLibraryComponent(props) {
    const { library, playerStatus, playlists, player, tracks } = props;
    const trackPlayingId = (player.queue.length > 0 && player.queueCursor !== null) ? player.queue[player.queueCursor]._id : null;

    // Loading library
    if (library.loading) {
      return (
        <FullViewMessage>
          <p>加载中...</p>
        </FullViewMessage>
      );
    }

    // Empty library
    if (tracks.length === 0 && library.search === '') {
      if (library.refreshing) {
        return (
          <FullViewMessage>
            <p>正在扫描...</p>
          </FullViewMessage>
        );
      }

      return (
        <FullViewMessage>
          <p>没有音乐</p>
          <p className='sub-message'>
            <Link to='/settings'>添加音乐</Link>
          </p>
        </FullViewMessage>
      );
    }

    // Empty search
    if (tracks.length === 0) {
      return (
        <FullViewMessage>
          <p>未找到相关结果</p>
          <p className='sub-message'>
            <Link to='/settings'>添加音乐</Link>
          </p>
        </FullViewMessage>
      );
    }

    // All good !
    return (
      <TracksList
        type='library'
        playerStatus={playerStatus}
        tracks={tracks}
        trackPlayingId={trackPlayingId}
        playlists={playlists}
      />
    );
  }

  render() {
    return (
      <div className='view view-library' >
        { this.getLibraryComponent(this.props) }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { search, tracks, sort } = state.library;

  // 过滤歌单
  // 排序操作比较昂贵，所以后操作
  const filteredTracks = sortTracks(
    filterTracks(tracks.library, search),
    SORT_ORDERS[sort.by][sort.order]
  );

  return {
    playerStatus: state.player.playerStatus,
    playlists: state.playlists,
    library: state.library,
    player: state.player,
    tracks: filteredTracks,
  };
};

export default connect(mapStateToProps)(Library);
