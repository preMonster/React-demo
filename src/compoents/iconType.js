import React from 'react';
import ReactDOM from 'react-dom';
import '../icon/iconfont.css';

export default class Icon extends React.Component {

        render() {
          const type = this.props.type;
            return (
              <i className={"icon anticon icon-"+type} style={this.props.style}></i>
          )
          }

}
