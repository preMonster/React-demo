import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Button,Switch,Form,Row,Col } from 'antd';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ReferenceLine,Brush } from 'Recharts';
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


class BarChartList extends Component{
  constructor(props){
    super(props);
    this.state = {
      vertical:"horizontal",
      stackId:"b",
      brush:false
    }
  }

  componentDidMount(){
    this.props.fetchRechars();
  }



    handleChangeVertical(){
      this.setState({
        vertical:this.state.vertical=="vertical"?"horizontal":"vertical"
      });
    }

    handleChangeStackId(){
      this.setState({
        stackId:this.state.stackId=="a"?"b":"a"
      });
    }

    handleChangeBrush(){
      this.setState({
        brush:!this.state.brush
      });
    }

  render(){
    const data = this.props.rechar.data!=undefined?this.props.rechar.data.BarCharts:[];

    return(
      <div className="LineCharts">
        <Title name={"柱状图"} iconType={"bar-chart"} />
        <div className="LineChartsContent">
          <BarChart layout={this.state.vertical} width={600} height={300} data={data}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
             <XAxis dataKey={this.state.vertical=="vertical"?"":"name"}  type={this.state.vertical=="vertical"?"number":"category"}/>
             <YAxis dataKey={this.state.vertical=="vertical"?"name":""} type={this.state.vertical=="vertical"?"category":"number"}/>
             <CartesianGrid strokeDasharray="3 3"/>
             <Tooltip/>
             <Legend />
             {this.state.brush?<Brush dataKey='name' height={30} stroke="#8884d8"/>:""}
             <Bar dataKey="pv" stackId="a" fill="#8884d8" />
             <Bar dataKey="uv" stackId={this.state.stackId} fill="#82ca9d" />
           </BarChart>
        </div>

        <div className="LineChartsContent LineChartsSwitch">
        <Form layout="inline">
          <FormItem label="vertical">
            <Switch defaultChecked={this.state.monotone=="vertical"} onChange={this.handleChangeVertical.bind(this)} />
          </FormItem>
          <FormItem label="stack">
            <Switch defaultChecked={this.state.stackId=="a"} onChange={this.handleChangeStackId.bind(this)} />
          </FormItem>
          <FormItem label="Brush">
            <Switch defaultChecked={this.state.brush} onChange={this.handleChangeBrush.bind(this)} />
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
)(BarChartList);
