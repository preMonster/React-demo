import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Form,Col,Row,Modal,Input } from 'antd';
import { Link } from 'react-router';
import "./tableModal.css";

import  Icon  from "../iconType.js";

const FormItem = Form.Item;
const { getFieldDecorator } = Form;

class TableModal extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  handleOk = (e) => {
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      form.resetFields();
      this.props.submitModal(values,this.props.ModalType);
    });
  }

  handleCancel = (e) => {
    this.props.form.resetFields();
    this.props.changeModalState();
  }

  render(){
    const visible = this.props.showModal;
    const ModalType = this.props.ModalType;
    const isView = ModalType==2?true:false;
    const record = this.props.record;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };

    return(
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}>
          <Form>
           <FormItem label="ID">
            {getFieldDecorator('id', {
              rules: [{ required: true, message: 'Please input the ID of collection!' }],
              initialValue:ModalType!=0?record.id:""
            })(
              <Input disabled={isView} />
            )}
          </FormItem>
           <FormItem label="参数">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input the name of collection!' }],
              initialValue:ModalType!=0?record.name:""
            })(
              <Input disabled={isView} />
            )}
          </FormItem>
           <FormItem label="类型">
            {getFieldDecorator('type', {
              rules: [{ required: true, message: 'Please input the type of collection!' }],
              initialValue:ModalType!=0?record.type:""
            })(
              <Input  disabled={isView}/>
            )}
          </FormItem>
           <FormItem label="默认">
            {getFieldDecorator('moren', {
              initialValue:ModalType!=0?record.moren:""
            })(
              <Input disabled={isView}/>
            )}
          </FormItem>
          <FormItem label="说明">
            {getFieldDecorator('content', {
              initialValue:ModalType!=0?record.content:""
            })(<Input type="textarea"  disabled={isView}/>)}
          </FormItem>
          </Form>

      </Modal>
    )
  }

}


export default Form.create()(TableModal);
