import React, { Component } from 'react';
import {  Icon , Button , Spin } from 'antd';
import { Link } from 'react-router';
import "./mydeskType.css";


const colors = ["pink","red","orange","green","cyan","blue","purple","#f50","#2db7f5","#87d068","#108ee9"];

export default class MydeskType extends Component{
  constructor(props){
    super(props);
  }


  render(){

    const data = this.props.data;
    const child = data.children;
    return(
      <div className="MydeskAnyType">

       <Spin spinning={this.props.isFetching}>
        <div className="MydeskAnyTypeTitle">
          <Icon type={data.type}/>&nbsp;&nbsp;<span>{data.name}</span>
        </div>
        <div className="MydeskAnyTypeContent">
          {
            child.length==0?
            <div className="MydeskAnyTypeContentChild">
            <div className="ContentChildtitle">
              <span>{data.name}</span>
              </div>
              <div className="ContentChildContent">
              <span>{data.content}</span>
              <Link to={data.link}><Button type="primary">跳转</Button></Link>
              </div>
            </div>:child.map((item,index) => {
              return <div key={item.name+index} className="MydeskAnyTypeContentChild">
                      <div className="ContentChildtitle">
                        <span>{item.name}</span>
                      </div>
                      <div className="ContentChildContent">
                      <span>{item.content}</span>
                      <Link to={item.link}><Button type="primary">跳转</Button></Link>
                      </div>
                      </div>
            })
          }
        </div>
        </Spin>
      </div>
    )
  }
}
