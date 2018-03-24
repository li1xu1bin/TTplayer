import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TracksListHeaderCell from './TracksListHeaderCell.react';

import * as SORT from '../../constants/sort-types';


class TracksListHeader extends React.Component {
  static propTypes = {
    enableSort: PropTypes.bool,
    sort: PropTypes.object,
  }

  getIcon(sort, sortType) {
    if (typeof sort === 'object' && sort.by === sortType) {
      if (sort.order === SORT.ASC) {
        return 'angle-up';
      }

      // Must be DSC then
      return 'angle-down';
    }

    return null;
  }

  render() {
    const { enableSort, sort } = this.props;

    return (
      <div className='tracks-list-header'>
        <TracksListHeaderCell
          className='cell-track-playing'
          title='&nbsp;'
        />
        <TracksListHeaderCell
          className='cell-track'
          title='标题'
          sortBy={enableSort ? SORT.TITLE : null}
          icon={this.getIcon(sort, SORT.TITLE)}
        />
        <TracksListHeaderCell
          className='cell-artist'
          title='歌手'
          sortBy={enableSort ? SORT.ARTIST : null}
          icon={this.getIcon(sort, SORT.ARTIST)}
        />
        <TracksListHeaderCell
          className='cell-album'
          title='专辑'
          sortBy={enableSort ? SORT.ALBUM : null}
          icon={this.getIcon(sort, SORT.ALBUM)}
        />
        <TracksListHeaderCell
          className='cell-duration'
          title='时长'
          sortBy={enableSort ? SORT.DURATION : null}
          icon={this.getIcon(sort, SORT.DURATION)}
        />
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  if (ownProps.enableSort) {
    return {
      sort: state.library.sort,
    };
  }

  return {};
};

export default connect(mapStateToProps)(TracksListHeader);
