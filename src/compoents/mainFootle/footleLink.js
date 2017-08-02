import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import {  Popover } from 'antd';
import { Link } from 'react-router';
import Icon from '../iconType.js';
import "./footleLink.css";

export default class FootleLink extends Component {
  constructor(props) {
    super(props);
  }

  getTextORA(){
    if(this.props.isText==true){
      return <span className="linkTextImg"><img  src={require("../../icon/iconFile/"+this.props.imgName+".png")}/><span>{this.props.href}</span></span>
    }else{
      return <span className="linkTextImg"><img  src={require("../../icon/iconFile/"+this.props.imgName+".png")}/><a onClick={this.turnHref.bind(this)}>{this.props.href}</a></span>;
    }
  }

  getPopoverContent(){
    const text = this.props.isText?"Link Me":"Turn To My "+this.props.imgName;
    const img = !this.props.isText?require("../../img/tou.jpg"):require("../../img/"+this.props.imgName+".png");
    return <div className="PopoverContent"><span>{text}</span><img src={img}/></div>
  }

  turnHref(){
    window.location.href = this.props.href;
  }

  render(){
    const content = (this.getPopoverContent());
    return(
      <Popover placement="top" content={content}>
        <div className="link">
          {this.getTextORA()}
        </div>
      </Popover>
    );
  }
}
