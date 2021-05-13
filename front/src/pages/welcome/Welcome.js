import React from "react";
import signinImg from "../../images/logo_fullsize.png";
import { Button } from "reactstrap";

import s from './Welcome.module.scss';
import { joinDevolution, isMember } from '../../web3api';

const btnStyle = {
  zIndex: 1000,
  position: 'relative',
  top: '520px',
  margin: 'auto',
  width: '40%',
  marginRight: '35px' //Trick to align with background screen text not really centered
}

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.myDivToFocus = React.createRef()

    this.state = {
      member: false
    };
  }

  handleDivClick = (event) => {
    if(this.myDivToFocus.current){
        this.myDivToFocus.current.scrollIntoView({ 
           behavior: "smooth", 
           block: "nearest"
        })
    }
  }

  handleBtnClick = (event) => {
    console.log("[Web3] Joining Devolution!");
    joinDevolution().then(res => {
      console.log("[Web3] res", res);
      if(res.hasOwnProperty('stack')){
        alert("Error while joining Devolution:\n" + res["stack"])
      } else if(res.hasOwnProperty('transactionHash')){
        alert("Successfully joined Devolution, transaction:\n" + res["transactionHash"])
      }
    });
  }

  componentDidMount() {
    isMember().then(res => {
      console.log("[Web3] Getting is Devolution member!", res);
      this.setState({member: res});
    });
  }

  render() {
    return (
      <div className={`${s.root}`}>
        <img src={signinImg} alt="signin" className={`${s.dvdImg}`} onClick={this.handleDivClick}/>
        <Button style={btnStyle} color="secondary" size="lg" onClick={this.handleBtnClick}>
          {!this.state.member ? "Join Devolution" : "Welcome back, Devolution member!"}
        </Button>{' '}
        <div className={`${s.imagePart}`,`${s.imagePart1}`} onClick={this.handleDivClick}></div>
        <div className={`${s.imagePart}`,`${s.imagePart2}`} ref={this.myDivToFocus}></div>
        <div className={`${s.imagePart}`,`${s.imagePart3}`}></div>
        <div className={`${s.imagePart}`,`${s.imagePart4}`}></div>
      </div>
    );
  }
}

export default Welcome;