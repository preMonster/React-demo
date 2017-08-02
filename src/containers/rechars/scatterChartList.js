import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Button,Switch,Form } from 'antd';
import {ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend} from 'Recharts';
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

class ScatterChartList extends Component{
  constructor(props){
    super(props);
    this.state = {
      domain:false
    }
  }

  componentDidMount(){
    this.props.fetchRechars();
  }


    handleChangeDomain(){
        this.setState({
          domain:!this.state.domain
        });
    }

  render(){
    const data1 = this.props.rechar.data!=undefined?this.props.rechar.data.ScatterCharts.data01:[];
    const data2 = this.props.rechar.data!=undefined?this.props.rechar.data.ScatterCharts.data02:[];

    return(
      <div className="LineCharts">
        <Title name={"散点图"} iconType={"dot-chart"} />
        <div className="LineChartsContent">
        	<ScatterChart width={400} height={400} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
          	<XAxis dataKey={'x'} name='stature' unit='cm'/>
          	<YAxis dataKey={'y'} name='weight' unit='kg'/>
            <ZAxis dataKey={'z'} range={[60, 400]} name='score' unit='km'/>
            <CartesianGrid />
          	<Tooltip cursor={{strokeDasharray: '3 3'}}/>
            <Legend/>
          	<Scatter name='A school' data={data1} fill='#8884d8' shape="star"/>
            <Scatter name='B school' data={data2} fill='#82ca9d' shape="triangle"/>
          </ScatterChart>
        </div>

      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScatterChartList);
