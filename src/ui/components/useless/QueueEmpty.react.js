import React, { PureComponent } from 'react';


/*
|--------------------------------------------------------------------------
| EmptyQueue
|--------------------------------------------------------------------------
*/

export default class QueueEmpty extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='queue text-left'>
        <div className='empty-queue text-center'>
            播放列表为空
        </div>
      </div>
    );
  }
}
