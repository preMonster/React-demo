import React, { Component } from 'react';
import { Icon , Alert,Button,message,notification,Modal,Card} from 'antd';
import "./modalList.css";
import  Title  from "../../compoents/title.js";

export default class ModalList extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  openNotificationWithIcon(type){
    notification[type]({
      message: 'Notification Title',
      description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };

  info() {
  Modal.info({
    title: 'This is a notification message',
    content: (
      <div>
        <p>some messages...some messages...</p>
        <p>some messages...some messages...</p>
      </div>
    ),
    onOk() {},
  });
}

success() {
  Modal.success({
    title: 'This is a success message',
    content: 'some messages...some messages...',
  });
}

error() {
  Modal.error({
    title: 'This is an error message',
    content: 'some messages...some messages...',
  });
}

warning() {
  Modal.warning({
    title: 'This is a warning message',
    content: 'some messages...some messages...',
  });
}

  render(){

    return(
      <div className="MyModal">
        <Title name="弹出框" iconType="layout"/>
        <div className="MyModalContent">
         <div className="MyModalContentTitle" style={{color: "red"}}>
           <Icon type="exclamation-circle-o"/>&nbsp;&nbsp;<span>Alert警告提示框</span>
         </div>
         <div>
          <Alert
            className="Alert"
            message="success tips"
            description="Detailed description and advices about successful copywriting."
            type="success"
            showIcon
          />
          <Alert
            className="Alert"
            message="Warning"
            description="This is a warning notice about copywriting."
            type="warning"
            showIcon
          />
          <Alert
            className="Alert"
            message="Error"
            description="This is an error message about copywriting."
            type="error"
            showIcon
          />
         </div>
        </div>

        <div className="MyModalContent">
         <div className="MyModalContentTitle" style={{color: "#108EE9"}}>
           <Icon type="info-circle-o"/>&nbsp;&nbsp;<span>Message全局提示框</span>
         </div>
         <div>
          <Button className="message" onClick={() => {
            message.success('Success');
          }}>Success</Button>
          <Button className="message" onClick={() => {
            message.error('Error');
          }}>Error</Button>
          <Button className="message" onClick={() => {
            message.warning('Warning');
          }}>Warning</Button>
          <Button className="message" onClick={() => {
            const loading = message.loading('Loding..', 0);
            setTimeout(loading, 1000);
          }}>Loading</Button>
        </div>
        </div>

        <div className="MyModalContent">
         <div className="MyModalContentTitle" style={{color: "#18B064"}}>
           <Icon type="clock-circle-o"/>&nbsp;&nbsp;<span>Notification通知提醒框</span>
         </div>
         <div>
          <Button className="message" onClick={this.openNotificationWithIcon.bind(this,'success')}>Success</Button>
          <Button className="message" onClick={this.openNotificationWithIcon.bind(this,'info')}>Info</Button>
          <Button className="message" onClick={this.openNotificationWithIcon.bind(this,'warning')}>Warning</Button>
          <Button className="message" onClick={this.openNotificationWithIcon.bind(this,'error')}>Error</Button>
          <Button type="primary" onClick={
            () => {
                    notification.open({
                      message: 'Notification Title',
                      description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                      icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
                    });
                  }}>Open the notification box</Button>


        </div>
        </div>

        <div className="MyModalContent">
         <div className="MyModalContentTitle" style={{color: "yellow"}}>
           <Icon type="check-circle-o"/>&nbsp;&nbsp;<span>Modal对话框</span>
         </div>
         <div>
          <Button className="message" onClick={this.info.bind(this)}>Info</Button>
          <Button className="message" onClick={this.success.bind(this)}>Success</Button>
          <Button className="message" onClick={this.error.bind(this)}>Error</Button>
          <Button className="message" onClick={this.warning.bind(this)}>Warning</Button>
        </div>
        </div>

        <Card className="card">
          <Icon type="smile-o"/>&nbsp;&nbsp;<span>有关于modal表单的用法我写在了表格里，这里我就少写了点</span>
        </Card>

      </div>
    )
  }
}
