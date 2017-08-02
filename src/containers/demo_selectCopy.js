import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class SimpleSelectButtonCopy extends Component {

	constructor(){
		super();
		this.changeOpen =this.changeOpen.bind(this);
		this.creatUI =this.creatUI.bind(this);
		this.state = {
			open:false
		};
	}

	changeOpen(){
		this.setState({
			open:!this.state.open
		});
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
		return(
			<div>
				<button onClick={this.changeOpen}>
					{"Demo Text" || 'Nothing'}
				</button>
                {this.creatUI(this)}

								                <div>
								                    <Link to="/SimpleSelectButton">点击跳转</Link>
								                </div>
			</div>
		);
	}
}

SimpleSelectButtonCopy.PropTypes = {
    hindClick:React.func
};

SimpleSelectButtonCopy.defaultProps = {
    hindClick:(value,i,that) =>{
        console.log(value,i);
        that.changeOpen();
    }
};

export default SimpleSelectButtonCopy;
