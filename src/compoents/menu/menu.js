import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {  Menu,Button,Icon,Switch,Spin } from 'antd';
import { Link } from 'react-router';
import "./menu.css";

import { fetchMenus } from '../../action/menu/menuAction.js';

const SubMenu = Menu.SubMenu;


function mapStateToProps(state) {
  const { menu } = state;
  return { menu };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  // bindActionCreators(ActionCreators, dispatch)
  return {
    fetchMenus: () => dispatch(fetchMenus())
  };
}


class SarbarMenu extends Component{
  constructor(props){
    super(props);
    this.state = {
      collapsed:false,
      theme:true
    }
  }

  componentDidMount(){
    this.props.fetchMenus();
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  toggleTheme = (value) => {
    this.setState({
      theme: value
    });
  }

  getMenuChild(){
  }


  render(){
    const data = this.props.menu.data ? this.props.menu.data : [];
    return(
      <div className="MenuContent">
        <div className="MenuButtons">
          <Button className="MenuButton" type="primary" onClick={this.toggleCollapsed}>
            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
          </Button>
          <Switch
            className="MenuButton"
            checked={this.state.theme}
            onChange={this.toggleTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
        </div>
        <Spin spinning={this.props.menu.isFetching}>
        <Menu
           mode="inline"
           theme={this.state.theme?"dark":"light"}
           inlineCollapsed={this.state.collapsed}
         >
           {
              data.map((item,i)=> {
                if(item.children.length == 0){
                return <Menu.Item key={i}><Link to={item.link}><Icon type={item.type} /><span>{item.name}</span></Link></Menu.Item>
              }else{
                var child = item.children;
                return <SubMenu key={i} title={<span><Icon type={item.type} /><span>{item.name}</span></span>}>
                {child.map((item,j)=> {
                  return <Menu.Item key={i+""+j}><Link to={item.link}>{item.name}</Link></Menu.Item>
                })}
              </SubMenu>
              }
             })
           }
         </Menu>
         </Spin>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SarbarMenu);
