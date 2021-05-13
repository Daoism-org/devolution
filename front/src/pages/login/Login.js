import React from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Alert, Button, Label, Input, FormGroup } from "reactstrap";
import Widget from "../../components/Widget";
import { loginUser } from "../../actions/user";
import s from "./Login.module.scss";
import signinImg from "../../images/logo_fullsize.png";
//import web3 from "../../web3L2";
//import getOpenLogin from "../../openlogin";

class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  static isAuthenticated() {
    return localStorage.getItem("authenticated") === "true";
  }

  constructor(props) {
    super(props);

    this.state = {
      email: "admin@flatlogic.com",
      password: "password",
    };

    this.doLogin = this.doLogin.bind(this);
    this.googleLogin = this.googleLogin.bind(this);
    this.microsoftLogin = this.microsoftLogin.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  async componentDidMount() {
    //  const openlogin = await getOpenLogin()
    //  if (openlogin && openlogin.privKey && !Login.isAuthenticated()) {
    //    this.props.dispatch(
    //      loginUser({ email: this.state.email, password: this.state.password })
    //    );
    //  }
     if (Login.isAuthenticated()) {
       this.props.history.push("/app/main");
     }
  }

  changeEmail(event) {
    this.setState({ email: event.target.value });
  }

  changePassword(event) {
    this.setState({ password: event.target.value });
  }

  // async importUserAccount(privateKey) {
  //   const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  //   let balance = await web3.eth.getBalance(account.address);
  //   let address = account.address;
  //   return { balance, address };
  // }

  async doLogin(e) {
    e.preventDefault();
    //console.log(e.target);
    //if (e.target.name === "metamask") {
      if (window.ethereum) {
        try {
          const address = await window.ethereum.enable();
          //alert(address);
          this.props.dispatch(
            loginUser({
              email: this.state.email,
              password: this.state.password,
            })
          );
          window.location.reload(false);
        } catch (error) {
          alert("🦊 Please connect to Metamask to access this app.");
        }
      } else {
        alert(
          "🦊 You must install Metamask into your browser: https://metamask.io/download.html"
        );
      }
    // } else {
    //   try {
    //     const privKey = (await getOpenLogin()).login({
    //       loginProvider: "google",
    //       redirectUrl: `${window.origin}/login`,
    //     });
    //   } catch (error) {
    //     console.log("error", error);
    //   }
    // }
  }

  googleLogin() {
    this.props.dispatch(loginUser({ social: "google" }));
  }

  microsoftLogin() {
    this.props.dispatch(loginUser({ social: "microsoft" }));
  }

  signUp() {
    this.props.history.push("/register");
  }

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/app" },
    }; // eslint-disable-line

    // cant access login page while logged in
    if (
      Login.isAuthenticated()
    ) {
      return <Redirect to={from} />;
    }

    return (
      <div className="auth-page">
        <Widget
          style={{ zIndex: 10 }}
          className="widget-auth my-auto"
          title={
            <h3 className="mt-0 mb-2" style={{ fontSize: 40, color: "#ccc" }}>
              Welcome to Devolution!
            </h3>
          }
        >
          <p className="widget-auth-info">
            Please connect your wallet to access the app!
          </p>
          <form className="mt" onSubmit={() => {}}>
            <Button
              color="warning"
              className="auth-btn mb-3"
              size="sm"
              name="metamask"
              onClick={this.doLogin}
            >
              {this.props.isFetching ? "Loading..." : "Connect with Metamask"}
            </Button>
            <Button
              color="warning"
              className="auth-btn mb-3"
              size="sm"
              name="torus"
              onClick={this.doLogin}
            >
              {this.props.isFetching ? "Loading..." : "Connect with Torus"}
            </Button>
            <footer className={s.footer}>
              {new Date().getFullYear()} © Devolution - Scaling Ethereum
              Hackathon
            </footer>
          </form>
        </Widget>
        <img src={signinImg} alt="signin" className={"backImg"} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage,
  };
}

export default withRouter(connect(mapStateToProps)(Login));
