import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Avatar,Rate,Row,Col , Spin } from 'antd';
import './footle.css';

import tou from '../../img/tou.jpg';
import FootleLink from '../../compoents/mainFootle/footleLink.js';
import { fetchLogin } from '../../action/loginAction.js';


function mapStateToProps(state){
  const {login} = state;
  return {login} ;
}

function mapDispatchToProps(dispatch){
  return {
    fetchLogin : (parm) => dispatch(fetchLogin(parm))
  };
}

class Footle extends Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }

  componentDidMount(){
    this.props.fetchLogin(this.props.userName);
  }

  render(){
    const data = this.props.login.data !=undefined ? this.props.login.data[0] : {};
    const success = this.props.login.data!=undefined;
    console.log("this.props.isFetching",this.props);


    return(

      <Spin spinning={this.props.login.isFetching}>
      <div className="FootleMain">
        <div className="FootleAvatar">
          <Avatar shape="square" style={{width:"60px" , height:"60px"}} src={success?require("../../img/"+data.Avatar):tou} />
        </div>
        <div className="f" >
          <div className="FootleCol">
              <FootleLink href={success?data.CSDN:"暂无"} imgName={"CSDN"} isText={false}/>
              <FootleLink href={success?data.weixin:"微信：暂无"} imgName={success?data.weixinImgName:"weixin"} isText={true}/>
          </div>
          <div className="FootleCol">
            <FootleLink href={success?data.githup:"暂无"} imgName={"githup"} isText={false}/>
            <FootleLink href={success?data.qq:"QQ：暂无"} imgName={success?data.QQImgName:"qq"} isText={true}/>
          </div>
        </div>
      </div>
      </Spin>
    )
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footle);
