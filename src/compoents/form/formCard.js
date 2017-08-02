import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form , Breadcrumb, Icon,Input,Button } from 'antd';
import { Link } from 'react-router';
import "./formCard.css";
import  Title  from "../title.js";

const FormItem = Form.Item;

function mapStateToProps(state){
  const {login} = state;
  return {login} ;
}


function getCookie(){
  if(document.cookie.length>0){
    var cookieArr = document.cookie.split(";");
    return cookieArr;
  }
  return "";
}

class formCard extends Component{
  constructor(props){
    super(props);
    this.state = {
        passWordErrA:"",
        passWordErr:"",
        passWordStatusA:"",
        passWordStatus:"",
    }
  }

  componentDidMount(){
    var user = getCookie();
  }


    handleSubmit = (e) => {
      this.textOnChange();
      this.props.form.validateFields((err, values) => {
        if(values.password!=values.arginPassword){
          this.setState({
              passWordErrA:"密码不相同",
              passWordErr:"密码不相同",
              passWordStatusA:"error",
              passWordStatus:"error",
          });
        }else{
          this.context.router.push('/formList');
        }
      });
    }

  clear(){
    this.props.form.resetFields();
  }

  textOnChange(){
    this.setState({
        passWordErrA:"",
        passWordErr:"",
        passWordStatusA:"",
        passWordStatus:"",
    });
  }

  render(){
    console.log(this.props);
    const data = this.props.login.data!=undefined?this.props.login.data[0]:{};
    const { getFieldDecorator } = this.props.form;
    return(
      <div className="FormCard">
        <Title name="表单———个人信息" iconType="solution"/>
        <Breadcrumb>
          <Breadcrumb.Item href="/formList">
            <Icon type="solution" />
            <span>表单</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            个人信息修改
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="FormContent">
          <Form>
            <FormItem>
              <lable>账号:</lable>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input your username!' }],
                initialValue:data.name || ""
              })(
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem  help={this.state.passWordErr} validateStatus={this.state.passWordStatus}>
              <lable>密码:</lable>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your password!' }],
                initialValue:data.password || ""
              })(
                <Input onChange={this.textOnChange.bind(this)}  prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem  help={this.state.passWordErrA} validateStatus={this.state.passWordStatusA}>
              <lable>确认密码:</lable>
              {getFieldDecorator('arginPassword', {
                rules: [{ required: true, message: 'Please input your password!' }],
                initialValue:data.password || ""
              })(
                <Input onChange={this.textOnChange.bind(this)} prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="arginPassword" />
              )}
            </FormItem>
            <FormItem>
              <lable>QQ:</lable>
              {getFieldDecorator('QQ', {
                rules: [{ required: true, message: 'Please input your QQ!' }],
                initialValue:data.qq || ""
              })(
                <Input  placeholder="qq账号" />
              )}
            </FormItem>
            <FormItem>
              <lable>微信:</lable>
              {getFieldDecorator('weixin', {
                rules: [{ required: true, message: 'Please input your 微信!' }],
                initialValue:data.weixin || ""
              })(
                <Input placeholder="微信账号" />
              )}
            </FormItem>
            <FormItem>
              <lable>博客:</lable>
              {getFieldDecorator('CSDN',{
                initialValue:data.CSDN || ""
              })(
                <Input placeholder="博客账号" />
              )}
            </FormItem>
            <FormItem>
              <lable>GitHup:</lable>
              {getFieldDecorator('githup',{
                initialValue:data.githup || ""
              })(
                <Input placeholder="Git账号" />
              )}
            </FormItem>
            <FormItem className="FormButton">
            <Button className="FormButtonChild" type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)}>
              Submit
            </Button>
            <Button className="FormButtonChild" onClick={this.clear.bind(this)}>
              Clear
            </Button>
            </FormItem>
          </Form>
         </div>
      </div>
    )
  }
}


formCard.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const FormCard = Form.create()(formCard);

export default connect(
  mapStateToProps
)(FormCard);
