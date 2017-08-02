import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Button,Switch,Form,Row,Col } from 'antd';
import {PieChart, Pie, Legend, Tooltip} from 'Recharts';
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


class PieChartList extends Component{
  constructor(props){
    super(props);
    this.state = {
      level:false
    }
  }

  componentDidMount(){
    this.props.fetchRechars();
  }



    handleChangeLevel(){
      this.setState({
        level:!this.state.level
      });
    }

  render(){
    const data1 = this.props.rechar.data!=undefined?this.props.rechar.data.PieCharts.data01:[];
    const data2 = this.props.rechar.data!=undefined?this.props.rechar.data.PieCharts.data02:[];

    return(
      <div className="LineCharts">
        <Title name={"饼状图"} iconType={"pie-chart"} />
        <div className="LineChartsContent">
          <PieChart width={800} height={300}>
             <Pie isAnimationActive={true} data={data1} cx={200} cy={200} outerRadius={this.state.level?60:80} fill="#8884d8" label={this.state.level?false:true}/>
             <Pie isAnimationActive={true}  startAngle={360} endAngle={0} data={data2} cx={this.state.level?200:500} cy={200} innerRadius={this.state.level?80:40} outerRadius={this.state.level?100:80} fill="#82ca9d" label/>
             <Tooltip/>
          </PieChart>
        </div>

        <div className="LineChartsContent LineChartsSwitch">
        <Form layout="inline">
          <FormItem label="level">
            <Switch defaultChecked={this.state.level} onChange={this.handleChangeLevel.bind(this)} />
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
)(PieChartList);
