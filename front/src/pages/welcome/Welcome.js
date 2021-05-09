import React from "react";
import signinImg from "../../images/logo_fullsize.png";

import s from './Welcome.module.scss';

class Welcome extends React.Component {

  render() {
    return (
      <div className={`${s.root}`}>
        <img src={signinImg} alt="signin" className={`${s.dvdImg}`}/>
        <div className={`${s.imagePart}`,`${s.imagePart1}`}>.</div>
        <div className={`${s.imagePart}`,`${s.imagePart2}`}>.</div>
        <div className={`${s.imagePart}`,`${s.imagePart3}`}></div>
        <div className={`${s.imagePart}`,`${s.imagePart4}`}></div>
      </div>
    );
  }
}

export default Welcome;