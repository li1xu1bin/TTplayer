import React, { Component } from 'react';
import PropTypes from 'prop-types';



/*
|--------------------------------------------------------------------------
| 提示
|--------------------------------------------------------------------------
*/

export default class Toasts extends Component {
  static propTypes = {
    toasts: PropTypes.array,
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='toasts'>
        { this.props.toasts.map((toast, index) => {
          return (
            // <Toast
            //   type={toast.type}
            //   content={toast.content}
            //   key={index}
            // />
      <div className={`alert alert-${toast.type}`}>
          {toast.content}
       </div>
          );
        }) 
        }
      </div>
    );
  }
}
