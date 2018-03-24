import os from 'os';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';


import { connect } from 'react-redux';
import Input from 'react-simple-input';

import AppActions from '../../actions/AppActions';
import WindowControls from './WindowControls.react';

import { config } from '../../lib/app';

/*
|--------------------------------------------------------------------------
| 顶部栏
|--------------------------------------------------------------------------
*/

class Header extends Component {
  static propTypes = {
    tracks: PropTypes.array,
    library: PropTypes.object,
    showTopHeader: PropTypes.bool,

  }

  constructor(props) {
    super(props);
  }
  search(e) {
    AppActions.library.filterSearch(e.target.value);
  }

  render() {
    const { showTopHeader } = this.props;

    return (
      <div className='header'>
        {
          showTopHeader && (
            <div className='top-header'>
              <WindowControls />
            </div>
          )
        }
              <NavLink
                to='/library'
                activeClassName='active'
                className='title-link'
                title='歌库'
              >
                歌库
              </NavLink>
              <NavLink
                to='/playlists'
                activeClassName='active'
                className='title-link'
                title='歌单'
              >
                歌单
              </NavLink>
              <NavLink
                to='/settings'
                activeClassName='active'
                className='title-link'
                title='设置'
              >
                设置
              </NavLink>
              <NavLink
                to='/playing'
                activeClassName='active'
                className='title-link'
                title='播放'
              >
                播放
              </NavLink>
              <Input
              selectOnClick
              placeholder='搜索'
              className='search'
              changeTimeout={250}
              clearButton
              ref='search'
              onChange={this.search}
              />
      </div>
    );
  }
}

const mapsStateToProps = (state) => {
  return {
    library: state.library,
    showTopHeader: os.platform() !== 'darwin' && !config.get('useNativeFrame'),
  };
};

export default withRouter(connect(mapsStateToProps)(Header));
