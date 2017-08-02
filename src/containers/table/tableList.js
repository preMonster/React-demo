import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Table ,Tooltip,Popconfirm,message,Form,Radio,Switch } from 'antd';
import { Link } from 'react-router';
import "./tableList.css";

import  Title  from "../../compoents/title.js";
import  Icon  from "../../compoents/iconType.js";
import  TableModal  from "../../compoents/table/tableModal.js";
import { fetchTables } from '../../action/table/tableAction.js';

const FormItem = Form.Item;

function mapStateToProps(state){
  const {table} = state;
  return {table} ;
}

function mapDispatchToProps(dispatch){
  return {
    fetchTables : () => dispatch(fetchTables())
  };
}

const expandedRowRender = record => <p>{record.description}</p>;
const title = () => '表格基本信息';
const showHeader = true;
const footer = () => 'thanks view';
const scroll = { y: 240 };

class TableList extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectedRowKeys:[],
      current:1,
      pageSize:5,
      showModal:false,
      record:{},
      ModalType:0,
      tableState:{
        bordered: false,
        loading: false,
        pagination: true,
        size: 'default',
        expandedRowRender:undefined,
        title:undefined,
        showHeader,
        footer:undefined,
        rowSelection: {},
        scroll: undefined
      }
    }
  }

  componentDidMount(){
    this.props.fetchTables();
  }

  tableSelceted(selectedRowKeys, selectedRows){
    this.setState({
      selectedRowKeys:selectedRowKeys
    })
  }

  paginationChange = (page) => {
   this.setState({
     current: page,
   });
 }

 onShowSizeChange(current, pageSize) {
  this.setState({
    current:current,
    pageSize:pageSize
  })
}

changeModalState(){
  this.setState({
    showModal:!this.state.showModal
  })
}

submitModal(record,ModalType){
  if(ModalType!=2){
    this.props.fetchTables().then(()=>{
      this.setState({
      selectedRowKeys:[]
    })
    });
  }
  this.changeModalState();
}

showModal(record,ModalType){
  this.setState({
    record:record,
    ModalType:ModalType
  })
  this.changeModalState();
}

confirmDelete(e) {
  const selectedRowKeys = this.state.selectedRowKeys;
  if(selectedRowKeys.length<=0){
    message.error('至少勾选一条数据');
  }else{
    this.props.fetchTables().then(()=>{
      this.setState({
      selectedRowKeys:[]
    })
    });
  }
}

saveFormRef = (form) => {
  this.form = form;
}

handleToggle = (prop) => {
    return (enable) => {
      var tableState = this.state.tableState;
      tableState[prop] = enable;
      this.setState({ tableState: tableState });
    };
  }

  handleSizeChange = (e) => {
    var tableState = this.state.tableState;
    tableState["size"] = e.target.value;
    this.setState({ tableState: tableState });
  }

  handleExpandChange = (enable) => {
    var tableState = this.state.tableState;
    tableState["expandedRowRender"] = enable ? expandedRowRender : false;
    this.setState({ tableState: tableState });
  }

  handleTitleChange = (enable) => {
    var tableState = this.state.tableState;
    tableState["title"] = enable ? title : undefined;
    this.setState({ tableState: tableState });
  }

  handleHeaderChange = (enable) => {
    var tableState = this.state.tableState;
    tableState["showHeader"] = enable ? showHeader : false;
    this.setState({ tableState: tableState });
  }

  handleFooterChange = (enable) => {
    var tableState = this.state.tableState;
    tableState["footer"] = enable ? footer : undefined;
    this.setState({ tableState: tableState });
  }

  handleRowSelectionChange = (enable) => {
    var tableState = this.state.tableState;
    tableState["rowSelection"] = enable ? {} : undefined;
    this.setState({ tableState: tableState });
  }

  handleScollChange = (enable) => {
    var tableState = this.state.tableState;
    tableState["scroll"] = enable ? scroll : undefined;
    this.setState({ tableState: tableState });
  }

render(){
  const column = [
    {
      title:"ID",
      key:"id",
      dataIndex:"id"
    },{
      title:"参数",
      key:"name",
      dataIndex:"name"
    },{
      title:"说明",
      key:"content",
      dataIndex:"content"
    },{
      title:"类型",
      key:"type",
      dataIndex:"type"
    },{
      title:"默认值",
      key:"moren",
      dataIndex:"moren"
    },{
        title: '操作',
        dataIndex: 'handle',
        render:(text,record,index) => (
                <span>
                    <Tooltip title="编辑"><span onClick={this.showModal.bind(this,record,1)}><Icon type={"edit"} style={{color:"#108EE9"}}/></span></Tooltip>&nbsp;&nbsp;
                    <Tooltip title="查看"><span onClick={this.showModal.bind(this,record,2)}><Icon type={"filetext"}  style={{color:"#CCCCCC"}}/></span></Tooltip>&nbsp;&nbsp;
                </span>
            )
    }
  ]

  const data = this.props.table.data !=undefined ? this.props.table.data:[];
  const rowKey = (record,index) => {
    return index;
  }

  const selectedRowKeys = this.state.selectedRowKeys;

  const tableSelceted = this.tableSelceted.bind(this);

  const rowSelection = this.state.tableState.rowSelection!=undefined?{
    selectedRowKeys,
    onChange:(selectedRowKeys, selectedRows) => {
      tableSelceted(selectedRowKeys, selectedRows);
    }
  }:undefined;

  const pagination = this.state.tableState.pagination?{
    pageSize:this.state.pageSize,
    current:this.state.current,
    defaultPageSize:5,
    defaultCurrent:1,
    pageSizeOptions:['1','5','10','20'],
    onChange:this.paginationChange.bind(this),
    total:data.length,
    showQuickJumper:true,
    showSizeChanger:true,
    onShowSizeChange:this.onShowSizeChange.bind(this)
  }:false;

  return (
    <div className="TableList">
      <Title name={"表格"} iconType={"appstore-o"} />
      <div className="Table">
        <div className="tootip">
          <Form layout="inline" className="tootipChild LeftForm">
            <FormItem label="Bordered">
              <Switch checked={this.state.tableState.bordered} onChange={this.handleToggle('bordered')} />
            </FormItem>
            <FormItem label="loading">
              <Switch checked={this.state.tableState.loading} onChange={this.handleToggle('loading')} />
            </FormItem>
            <FormItem label="Pagination">
              <Switch checked={this.state.tableState.pagination} onChange={this.handleToggle('pagination')} />
            </FormItem>
            <FormItem label="Title">
              <Switch checked={!!this.state.tableState.title} onChange={this.handleTitleChange} />
            </FormItem>
            <FormItem label="Column Header">
              <Switch checked={!!this.state.tableState.showHeader} onChange={this.handleHeaderChange} />
            </FormItem>
            <FormItem label="Footer">
              <Switch checked={!!this.state.tableState.footer} onChange={this.handleFooterChange} />
            </FormItem>
            <FormItem label="Expandable">
              <Switch checked={!!this.state.tableState.expandedRowRender} onChange={this.handleExpandChange} />
            </FormItem>
            <FormItem label="Checkbox">
              <Switch checked={!!this.state.tableState.rowSelection} onChange={this.handleRowSelectionChange} />
            </FormItem>
            <FormItem label="Fixed Header">
              <Switch checked={!!this.state.tableState.scroll} onChange={this.handleScollChange} />
            </FormItem>
            <FormItem label="Size">
              <Radio.Group size="default" value={this.state.tableState.size} onChange={this.handleSizeChange}>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="middle">Middle</Radio.Button>
                <Radio.Button value="small">Small</Radio.Button>
              </Radio.Group>
            </FormItem>
          </Form>
          <span className="tootipChild tootipRight">
            <Tooltip title="新增"><span onClick={this.showModal.bind(this,{},0)}><Icon type={"plus"}/></span></Tooltip>&nbsp;&nbsp;
            <Popconfirm title="确定删除?" onConfirm={this.confirmDelete.bind(this)} onCancel={()=>{}} okText="Yes" cancelText="No">
              <Tooltip title="删除"><span><Icon type={"delete"}  style={{color:"red"}}/></span></Tooltip>&nbsp;&nbsp;
            </Popconfirm>
          </span>
        </div>
        <Table
          bordered={this.state.tableState.bordered}
          title={this.state.tableState.title}
          size={this.state.tableState.size}
          expandedRowRender={this.state.tableState.expandedRowRender}
          scroll={this.state.tableState.scroll}
          footer={this.state.tableState.footer}
          showHeader={this.state.tableState.showHeader}
          rowKey={rowKey}
          rowSelection={rowSelection}
          columns={column}
          dataSource={data}
          loading={this.props.isFetching||this.state.tableState.loading}
          pagination={pagination}
        />
      </div>
      <div className="TableModal">
      <TableModal
        ref={this.saveFormRef}
        showModal={this.state.showModal}
        changeModalState={this.changeModalState.bind(this)}
        submitModal={this.submitModal.bind(this)}
        record={this.state.record}
        ModalType={this.state.ModalType}
      />
      </div>
    </div>
  )
}
}

export default connect(
mapStateToProps,
mapDispatchToProps
)(TableList);
