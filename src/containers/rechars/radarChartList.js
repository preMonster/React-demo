import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Button,Switch,Form } from 'antd';
import {Radar, RadarChart, PolarGrid, Legend,PolarAngleAxis, PolarRadiusAxis} from 'Recharts';
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

class RadarChartList extends Component{
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
    const data = this.props.rechar.data!=undefined?this.props.rechar.data.radarCharts:[];

    return(
      <div className="LineCharts">
        <Title name={"雷达图"} iconType={"pie-chart"} />
        <div className="LineChartsContent">
          <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={400} data={data}>
            <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
              <Radar name="LiLi" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6}/>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[this.state.domain?'dataMin':0, this.state.domain?'dataMax':150]}/>
          </RadarChart>
        </div>

        <div className="LineChartsContent LineChartsSwitch">
        <Form layout="inline">
          <FormItem label="domain">
            <Switch defaultChecked={this.state.domain} onChange={this.handleChangeDomain.bind(this)} />
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
)(RadarChartList);
