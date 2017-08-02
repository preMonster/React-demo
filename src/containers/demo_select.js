import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class SimpleSelectButton extends Component {

	constructor(){
		super();
		this.changeOpen =this.changeOpen.bind(this);
		this.creatUI =this.creatUI.bind(this);
        this.setText = this.setText.bind(this);
		this.state = {
			open:false,
            text:'',
            h:0,
            m:0,
            s:0
		};
	}

    componentDidMount(){
        // this.timer = setInterval(function(){
        //     var h = this.state.h;
        //     var m = this.state.m;
        //     var s = this.state.s+1;
				//
        //     if(s>=60){
        //         s=0;
        //         m++;
        //         if(m>=60){
        //             m=0;
        //             h++;
        //             h=h>=60?0:h;
        //         }
        //     }
				//
        //     this.setState({
        //         h:h,
        //         m:m,
        //         s:s
        //     });
        // }.bind(this),1000);
    }

	changeOpen(){
		this.setState({
			open:!this.state.open
		});
	}


	hindClick(value,i){
	}

    setText(e){
        this.setState({
            text:e.target.value
        })
    }


    creatUI(that){
        if(!that.state.open) {
			return null;
		}
            return (
                <ul>
                    {
                        [{name:"o1"},{name:"o2"},{name:"o3"}].map(function(value,i){
                            return(
                                <li key={i} onClick={() => that.props.hindClick(value,i,that)}>
                                    {value.name}
                                </li>
                            );
                        })
                    }
                </ul>
            );
    }

    foncMe(){
        this.refs.foc.focus();
    }


	render(){
        var arr = [
            <h1 key={1}>1</h1>,
            <h2 key={2}>2</h2>
        ];

        var HelloReact = React.createClass({
            render:function () {
                return <h3>{"Demo Text"}</h3>
            }
        });
		return(
			<div>
				<button onClick={this.changeOpen}>
					{this.props.valueText || 'Nothing'}
				</button>
                {this.creatUI(this)}
                <div>
                    <input onChange={this.setText}/>
                    <input value={this.state.text}/>
                </div>

                <div>{arr}</div>

                <HelloReact valueText={"Demo Text"}></HelloReact>

                <div>
                    <input type="text"  ref="foc"/>
                    <input type="button" value="focus me" onClick={this.foncMe.bind(this)}/>
                </div>

                <div>
                    <span>{this.state.h}:{this.state.m}:{this.state.s}</span>
                </div>



                <div>
                    <Link to="/SimpleSelectButtonCopy">点击跳转</Link>
                </div>
			</div>
		);
	}
}

SimpleSelectButton.PropTypes = {
    valueText:React.PropTypes.string.isRequired,
    selects:React.PropTypes.array.isRequired,
    hindClick:React.func
};

SimpleSelectButton.defaultProps = {
    hindClick:(value,i,that) =>{
        console.log(value,i);
        that.changeOpen();
    }
};

export default SimpleSelectButton;
