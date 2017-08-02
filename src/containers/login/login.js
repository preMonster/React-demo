import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox , message } from 'antd';
import { Link } from 'react-router';
import "./login.css";
import  Title  from "../../compoents/title.js";
import { fetchLogin } from '../../action/loginAction.js';

import login from "../../img/login.jpg";
import logo from "../../logo.svg";

const FormItem = Form.Item;


function mapStateToProps(state){
  const {login} = state;
  return {login} ;
}

function mapDispatchToProps(dispatch){
  return {
    fetchLogin : () => dispatch(fetchLogin())
  };
}

function addCookie(loginName,passWord){
  document.cookie = 'loginName='+escape(loginName)
  document.cookie = 'password='+escape(passWord);
}

function getCookie(){
  if(document.cookie.length>0){
    var cookieArr = document.cookie.split(";");
    return cookieArr;
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function clearCookie(name) {
    setCookie(name, "", -1);
}


class LoginList extends Component{
  constructor(props){
    super(props);
    this.state = {
      userNameErr:"",
      passWordErr:"",
      userNameStatus:"",
      passWordStatus:"",
      userName:"",
      password:""
    }
  }

  componentDidMount(){
    this.props.fetchLogin();
    var user = getCookie();
    if(user != ""){
      this.setState({
        userName:user[0].split("=")[1],
        password:user[1].split("=")[1]
      })
    }
  }

  handleSubmit = (userData,e) => {
    // e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var userNameErr = false;
        var passwordErr = false;
        const remember = values.remember;
        userData.map((item) => {
          if(item.name==values.userName){
            userNameErr = true;
            if(item.password==values.password){
              passwordErr=true;
            }
          }
        });
        if(userNameErr&&passwordErr){
          if(remember){
            this.rememberCookie(values);
          }else{
            this.clearUser(values);
          }
          this.rememberUserMess(userData);
          this.clear();
          this.context.router.push('/mydesk');
        }else{
          if(!userNameErr){
            this.setState({
              userNameErr:"用户名错误",
              userNameStatus:"error"
            });
          }else{
            this.setState({
              passWordErr:"密码错误",
              passWordStatus:"error"
            });
          }
        }
      }else{
        this.setState({
          userNameErr:"用户名不能为空",
          userNameStatus:"error",
          passWordErr:"密码不能为空",
          passWordStatus:"error"
        });
      }
    });
  }

  rememberCookie(values){
    addCookie(values.userName,values.password);
  }

  clearUser(values){
    var user = getCookie();
    if(user != "" &&user[0].split("=")[1]==values.userName){
      clearCookie("loginName");
      clearCookie("password");
    }
  }

  rememberUserMess(values){
    setCookie("userName",values.userName,1);
  }

  textOnChange(){
    this.setState({
      userNameErr:"",
      userNameStatus:"",
      passWordErr:"",
      passWordStatus:""
    });
  }

  clear(){
    this.props.form.resetFields();
    this.textOnChange();
  }

  render(){
  const { getFieldDecorator } = this.props.form;
  const userData = this.props.login.data==undefined?[]:this.props.login.data;

    return(
      <div className="login">
        <img  className="login_bgimg" src={login} />
        <div className="loginContent">
          <div className="loginLogo">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div className="loginForm">
            <Form className="loginMainForm"  className="login-form">
              <FormItem className="loginMainFormChild"  help={this.state.userNameErr} validateStatus={this.state.userNameStatus}>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                  initialValue:this.state.userName
                })(
                  <Input onChange={this.textOnChange.bind(this)}  prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                )}
              </FormItem>
              <FormItem  help={this.state.passWordErr} validateStatus={this.state.passWordStatus}>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                  initialValue:this.state.password
                })(
                  <Input onChange={this.textOnChange.bind(this)}  prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>Remember me</Checkbox>
                )}
              </FormItem>

              <FormItem className="formButton">
              <Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this,userData)} className="login-form-button">
                Login
              </Button>
              </FormItem>
              <FormItem className="formButton">
              <Button onClick={this.clear.bind(this)} className="login-form-button">
                Clear
              </Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}


LoginList.contextTypes = {
    router: React.PropTypes.object.isRequired
}


const Login = Form.create()(LoginList);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
