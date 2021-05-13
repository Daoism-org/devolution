import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import {
  Navbar,
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  InputGroupAddon,
  InputGroup,
  Input,
  Form,
  NavItem,
  NavLink,
} from "reactstrap";
import cx from "classnames";
import Notifications from "../Notifications";
import { logoutUser } from "../../actions/user";
import {
  toggleSidebar,
  openSidebar,
  closeSidebar,
  changeActiveSidebarItem,
} from "../../actions/navigation";

import userAvatar from "../../images/userAvatar.png";
import search from "../../images/search.svg";
import notify from "../../images/notify.svg";
import lightNotify from "../../images/light-notify.svg";
import messages from "../../images/messages.svg";
import lightMessages from "../../images/messages-filled.svg";
import arrowUnactive from "../../images/Arrow 6.svg";
import arrowActive from "../../images/Arrow 5.svg";

import s from "./Header.module.scss"; // eslint-disable-line css-modules/no-unused-class
import Identicon from "../../util/Identicon";
//import getOpenLogin from "../../openlogin";
import web3L2 from "../../web3L2";

const Web3 = require("web3");

class Header extends React.Component {
  static propTypes = {
    sidebarOpened: PropTypes.bool.isRequired,
    sidebarStatic: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.switchSidebar = this.switchSidebar.bind(this);
    this.toggleNotifications = this.toggleNotifications.bind(this);
    this.toggleMessages = this.toggleMessages.bind(this);
    this.toggleAccount = this.toggleAccount.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.doLogout = this.doLogout.bind(this);
    this.changeArrowImg = this.changeArrowImg.bind(this);
    this.changeArrowImgOut = this.changeArrowImgOut.bind(this);

    this.state = {
      menuOpen: false,
      notificationsOpen: false,
      messagesOpen: false,
      accountOpen: false,
      notificationsTabSelected: 1,
      focus: false,
      showNewMessage: false,
      hideMessage: true,
      run: true,
      arrowImg: arrowActive,
      account: "",
    };
  }

  toggleFocus = () => {
    this.setState({ focus: !this.state.focus });
  };

  toggleNotifications() {
    this.setState({
      notificationsOpen: !this.state.notificationsOpen,
    });
  }

  toggleMessages() {
    this.setState({
      messagesOpen: !this.state.messagesOpen,
    });
  }

  toggleAccount() {
    this.setState({
      accountOpen: !this.state.accountOpen,
    });
  }

  doLogout() {
    this.props.dispatch(logoutUser());
  }

  changeArrowImg() {
    this.setState({
      arrowImg: arrowUnactive,
    });
  }

  changeArrowImgOut() {
    this.setState({
      arrowImg: arrowActive,
    });
  }

  // collapse/uncolappse
  switchSidebar() {
    if (this.props.sidebarOpened) {
      this.props.dispatch(closeSidebar());
      this.props.dispatch(changeActiveSidebarItem(null));
    } else {
      const paths = this.props.location.pathname.split("/");
      paths.pop();
      this.props.dispatch(openSidebar());
      this.props.dispatch(changeActiveSidebarItem(paths.join("/")));
    }
  }

  // tables/non-tables
  toggleSidebar() {
    this.props.dispatch(toggleSidebar());
    if (this.props.sidebarStatic) {
      localStorage.setItem("staticSidebar", "false");
      this.props.dispatch(changeActiveSidebarItem(null));
    } else {
      localStorage.setItem("staticSidebar", "true");
      const paths = this.props.location.pathname.split("/");
      paths.pop();
      this.props.dispatch(changeActiveSidebarItem(paths.join("/")));
    }
  }

  toggleMenu() {
    this.setState({
      menuOpen: !this.state.menuOpen,
    });
  }

  getAddr = async () => {
    //const openlogin = await getOpenLogin();
    try {
      // if (openlogin && openlogin.privKey) {
      //   const account = web3L2.eth.accounts.privateKeyToAccount(
      //     openlogin.privKey
      //   );
      //   this.setState({ account: account.address });
      // } else 
      if (window.ethereum) {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8080");
        const accounts = await web3.eth.getAccounts();
        this.setState({ account: accounts[0] });
      } else {
        this.doLogout();
        window.location.reload(false);
      }
    } catch (error) {
      this.doLogout();
      window.location.reload(false);
    }
  };

  componentDidMount() {
    this.getAddr();
  }

  truncateAddr(addr) {
    return addr.substring(0, 6) + "..." + addr.substr(addr.length - 4);
  }

  render() {
    const { focus } = this.state;
    const { openUsersList } = this.props;

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const firstUserLetter = (user.name || user.email || "P")[0].toUpperCase();

    return (
      <Navbar
        className={`${s.root} d-print-none`}
        style={{ zIndex: !openUsersList ? 100 : 0, backgroundColor: "#323232" }}
      >
        <NavItem className={`${s.toggleSidebarNav} d-md-none d-flex mr-2`}>
          <NavLink
            className="ml-2 pr-4 pl-3"
            id="toggleSidebar"
            onClick={this.toggleSidebar}
          >
            <span className="glyphicon glyphicon-th-list"></span>
          </NavLink>
        </NavItem>
        <button className={`btn btn-bordered ml-auto ${s.fullVersionBtn}`}>
          <Identicon seed={this.state.account} size={12} />
          {this.truncateAddr(this.state.account)}
        </button>
        <Nav>
          <Dropdown
            nav
            isOpen={this.state.notificationsOpen}
            toggle={this.toggleNotifications}
            id="basic-nav-dropdown"
            className={`${s.notificationsMenu}`}
          >
            <DropdownToggle
              nav
              className={"text-white"}
              style={{ marginLeft: 20 }}
            >
              {this.state.notificationsOpen ? (
                <img
                  src={lightNotify}
                  alt="notify"
                  width="24px"
                  height={"24px"}
                />
              ) : (
                <>
                  <img src={notify} alt="notify" width="24px" height={"24px"} />
                  <i
                    className={`fa fa-circle text-danger mb-2 ${s.circleStyle}`}
                  />
                </>
              )}
            </DropdownToggle>
            <DropdownMenu
              right
              className={`${s.notificationsWrapper} py-0 animated animated-fast fadeInUp`}
            >
              <Notifications />
            </DropdownMenu>
          </Dropdown>
        </Nav>
      </Navbar>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
  };
}

export default withRouter(connect(mapStateToProps)(Header));
