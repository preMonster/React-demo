import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon , Button ,Tooltip } from 'antd';
import { Link } from 'react-router';
import "./formList.css";
import  Title  from "../../compoents/title.js";
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

function getCookie(){
  if(document.cookie.length>0){
    var cookieArr = document.cookie.split(";");
    return cookieArr;
  }
  return "";
}

class FormList extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentDidMount(){
    var user = getCookie();
    this.props.fetchLogin(user[0].split("=")[1]);
  }

  render(){
    const data = this.props.login.data!=undefined?this.props.login.data[0]:{};
    return(
      <div className="MyForm">
        <Title name="表单" iconType="solution"/>
        <div className="MyFormContent">
          <div className="MyFormContentChild">
            <h2>我写了关于个人信息修改的表单demo，作为表单的例子</h2>
            <Link to="/formList/formCard"><Button className="MyFormContentButton" type="primary">转入demo</Button></Link>
          </div>

          <Tooltip title="退出登录"><Link to="/login" ><Button className="MyFormContentButton backLogin" type="danger">退出登录</Button></Link></Tooltip>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormList);
