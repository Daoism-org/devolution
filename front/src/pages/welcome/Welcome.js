import React from "react";
import signinImg from "../../images/logo_fullsize.png";

import s from './Welcome.module.scss';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.myDivToFocus = React.createRef()
  }

  handleOnClick = (event) => {
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
        <img src={signinImg} alt="signin" className={`${s.dvdImg}`}/>
        <div className={`${s.imagePart}`,`${s.imagePart1}`} onClick={this.handleOnClick}></div>
        <div className={`${s.imagePart}`,`${s.imagePart2}`} ref={this.myDivToFocus}></div>
        <div className={`${s.imagePart}`,`${s.imagePart3}`}></div>
        <div className={`${s.imagePart}`,`${s.imagePart4}`}></div>
      </div>
    );
  }
}

export default Welcome;