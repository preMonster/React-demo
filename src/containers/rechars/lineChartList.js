import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Button,Switch,Form,Row,Col } from 'antd';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'Recharts';
import "./lineChartList.css";
import  Title  from "../../compoents/title.js";
import  { fetchRechars }  from "../../action/rechars/recharAction.js";

const FormItem = Form.Item;

function mapStateToProps(state){
  const {rechar} = state;
  return {rechar} ;
}

function mapDispatchToProps(dispatch){
  return {
    fetchRechars : () => dispatch(fetchRechars())
  };
}

class LineChartList extends Component{
  constructor(props){
    super(props);
    this.state = {
      monotone:"monotone",
      vertical:"horizontal",
      strokeDasharray:true
    }
  }

  componentDidMount(){
    this.props.fetchRechars();
  }

  handleChangeMonotone(){
    this.setState({
      monotone:this.state.monotone=="monotone"?"linear":"monotone"
    });
  }


    handleChangeVertical(){
      this.setState({
        vertical:this.state.vertical=="vertical"?"horizontal":"vertical"
      });
    }

    handleChangeStrokeDasharray(){
        this.setState({
          strokeDasharray:!this.state.strokeDasharray
        });
    }

  render(){
    const data = this.props.rechar.data!=undefined?this.props.rechar.data.LineCharts:[];

    return(
      <div className="LineCharts">
        <Title name={"折线图"} iconType={"line-chart"} />
        <div className="LineChartsContent">
          <LineChart layout={this.state.vertical} width={600} height={300} data={data}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
           <XAxis  dataKey={this.state.vertical=="vertical"?"":"name"} type={this.state.vertical=="vertical"?"number":"category"}/>
           <YAxis dataKey={this.state.vertical=="vertical"?"name":""} type={this.state.vertical=="vertical"?"category":"number"}/>
           <CartesianGrid strokeDasharray="3 3"/>
           <Tooltip/>
           <Legend />
           <Line type={this.state.monotone} dataKey="pv" stroke="#8884d8"  strokeDasharray={this.state.strokeDasharray?"5 5":"5 0"}/>
           <Line type={this.state.monotone} dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </div>

        <div className="LineChartsContent LineChartsSwitch">
        <Form layout="inline">
          <FormItem label="monotone">
            <Switch defaultChecked={this.state.monotone=="monotone"} onChange={this.handleChangeMonotone.bind(this)} />
          </FormItem>
          <FormItem label="vertical">
            <Switch defaultChecked={this.state.monotone=="vertical"} onChange={this.handleChangeVertical.bind(this)} />
          </FormItem>
          <FormItem label="strokeDasharray">
            <Switch defaultChecked={this.state.strokeDasharray} onChange={this.handleChangeStrokeDasharray.bind(this)} />
          </FormItem>
          </Form>
        </div>

      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LineChartList);
