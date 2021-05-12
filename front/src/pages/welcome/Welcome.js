import React from "react";
import signinImg from "../../images/logo_fullsize.png";
import { Button } from "reactstrap";

import s from './Welcome.module.scss';

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
  }

  handleBtnClick = (event) => {
    alert("Joining Devolution!")
  }

  handleDivClick = (event) => {
    if(this.myDivToFocus.current){
        this.myDivToFocus.current.scrollIntoView({ 
           behavior: "smooth", 
           block: "nearest"
        })
    }
  }
  
  render() {
    return (
      <div className={`${s.root}`}>
        <img src={signinImg} alt="signin" className={`${s.dvdImg}`} onClick={this.handleDivClick}/>
        <Button style={btnStyle} color="secondary" size="lg" onClick={this.handleBtnClick}>Join Devolution</Button>{' '}
        <div className={`${s.imagePart}`,`${s.imagePart1}`} onClick={this.handleDivClick}></div>
        <div className={`${s.imagePart}`,`${s.imagePart2}`} ref={this.myDivToFocus}></div>
        <div className={`${s.imagePart}`,`${s.imagePart3}`}></div>
        <div className={`${s.imagePart}`,`${s.imagePart4}`}></div>
      </div>
    );
  }
}

export default Welcome;