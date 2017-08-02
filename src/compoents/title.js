import React from 'react';
import './title.css';
import { Icon } from 'antd';

export default class Title extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="title">
          <Icon className="titleIcon" type={this.props.iconType} />
        <h1>{this.props.name}</h1>
      </div>
    )
  }
}
