import React from "react";
import signinImg from "../../images/logo_fullsize.png";

import s from './Welcome.module.scss';

class Welcome extends React.Component {

  render() {
    return (
      <div className={s.root}>
        <img src={signinImg} alt="signin" className={`${s.dvdImg}`}/>
        <h5><i>Wait and see...</i></h5>
      </div>
    );
  }
}

export default Welcome;