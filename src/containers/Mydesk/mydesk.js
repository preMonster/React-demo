import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Carousel,Icon,Tooltip,Spin  } from 'antd';
import { Link } from 'react-router';
import "./mydesk.css";
import  Title  from "../../compoents/title.js";
import { fetchMenus } from '../../action/menu/menuAction.js';
import MydeskType  from '../../compoents/mydesk/mydeskType.js';


function mapStateToProps(state){
  const {menu} = state;
  return {menu} ;
}

function mapDispatchToProps(dispatch){
  return {
    fetchMenus : () => dispatch(fetchMenus())
  };
}

class Mydesk extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentDidMount(){
    this.props.fetchMenus();
  }

  render(){

    const dataTotal = this.props.menu.data!=undefined?this.props.menu.data:[];
    const data = dataTotal.concat();
    if(data.length!=0){
      data.splice(0,1)
    }

    return(
      <div className="Mydesk">
        <Title name="我的桌面" iconType="desktop"/>

        <div className="CardContent">
         <Spin spinning={this.props.menu.isFetching}>
          <Carousel autoplay className="Carousel">
          <div className="CarouselChild"><Tooltip title="跳转到我的桌面"><Link to="/mydesk"><Icon type={"desktop"}/>&nbsp;&nbsp;<span>我的桌面</span></Link></Tooltip></div>
            {
              data.map((item,index) => {
                return <div className="CarouselChild" key={item.type}><Tooltip title={"跳转到"+item.name}><Link to={item.link==""?item.children[0].link:item.link}><Icon type={item.type}/>&nbsp;&nbsp;<span>{item.name}</span></Link></Tooltip></div>
              })
            }
          </Carousel>
          </Spin>
        </div>

        <div className="CardContent">
        {
          dataTotal.map((item,index) => {
            return <MydeskType isFetching={this.props.menu.isFetching} key={item.name+index} data={item}/>
          })
        }
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mydesk);
