import React, { Component } from 'react';

class DateH extends Component {
  constructor(props){
		super(props);
		this.state = {
      date:"",
      week:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
		};
	}

  componentDidMount(){
    this.timer = setInterval(function(){
      var date = new Date();
      var dateString = this.state.week[date.getDay()]+" , "+date.getDate()+"/"+(date.getMonth()+1)+"/"+date.toString().split(" ")[3]+" "+date.toString().split(" ")[4];
      this.setState({
        date:dateString
      });
    }.bind(this),1000);
  }

  render(){
    return(
        <h3 style={{color:"#fff"}}>{this.state.date}</h3>
    );
  }
}
export default DateH;
