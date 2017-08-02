import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import createHistory from 'history/lib/createHashHistory';

import DateH from './containers/mainHeader/date.js';
import SarbarMenu from './compoents/menu/menu.js';
import Footle from './containers/mainFootle/footle.js';
import logo from './logo.svg';
import './main.css';


function getCookie(){
  if(document.cookie.length>0){
    var cookieArr = document.cookie.split(";");
    return cookieArr;
  }
  return "";
}

// 配置整体组件
class main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          userName:""
        }
    }

    componentDidMount(){
        const user = getCookie();
        this.setState({
          userName:user[0].split("=")[1]
        });
    }


    render() {

        return (
            <div className="Main">
            <div className="MainHeader">
              <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 style={{color:"#fff"}}>Welcome to MyReact</h1>
                <DateH />
              </div>
            </div>
            <div className="MainContent">
              <div className="MainSaber">
                <div className="MainContentChild">
                  <SarbarMenu />
                </div>
              </div>
              <div className="MainContentRight">
                <div className="MainContentChild">
                  {this.props.children}
                </div>
              </div>
            </div>
            <div className="MainFooter">
              <Footle userName={this.state.userName}/>
            </div>
            </div>
        )
    }
}
export default connect(
)(main);
