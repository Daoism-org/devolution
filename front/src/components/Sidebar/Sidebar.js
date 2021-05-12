import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { dismissAlert } from "../../actions/alerts";
import s from "./Sidebar.module.scss";
import LinksGroup from "./LinksGroup/LinksGroup";
import {
  changeActiveSidebarItem
} from "../../actions/navigation";
import { logoutUser } from "../../actions/user";

import logo from "../../images/logo2.png";
import welcomeIcon from '../../images/icons/Package_outlined.svg';
import discoverIcon from '../../images/icons/Core_outlined.svg';
import daoIcon from '../../images/icons/ui elements_outlined.svg';
import reputationIcon from '../../images/icons/Profile_outlined.svg';
import disconnectIcon from '../../images/icons/Logout_outlined.svg';

class Sidebar extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    activeItem: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string
    }).isRequired
  };

  static defaultProps = {
    sidebarStatic: true,
    sidebarOpened: true,
    activeItem: ""
  };

  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
  }

  dismissAlert(id) {
    this.props.dispatch(dismissAlert(id));
  }

  doLogout() {
    this.props.dispatch(logoutUser());
  }

  render() {
    return (
        <div className={`${(!this.props.sidebarOpened && !this.props.sidebarStatic ) ? s.sidebarClose : ''} ${s.sidebarWrapper}`} id={"sidebar-drawer"}>
        <nav className={s.root}>
          <header className={s.logo}>
            <img src={logo} alt="logo" className={s.logoStyle} />
            <span style={{color: '#ddd'}}>Devolution</span>
          </header>
          <h5 className={s.navTitle}>HOME</h5>
          <ul className={s.nav}>
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Welcome"
              isHeader
              link="/app/home/welcome"
              index="main"
            >
            <img
              src={welcomeIcon}
              alt="welcome"
              width={"24px"}
              height={"24px"}
            />
            </LinksGroup>
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Discover DAOs"
              isHeader
              link="/app/home/discover"
              index="main"
            >
            <img
              src={discoverIcon}
              alt="discover"
              width={"24px"}
              height={"24px"}
            />
            </LinksGroup>
          </ul>
          <h5 className={s.navTitle}>YOUR DAO'S</h5>
          <ul className={s.nav}>
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="ANGEL"
              isHeader
              link="/app/dao/angel"
              index="main"
            >
            <img
              src={daoIcon}
              alt="dao"
              width={"24px"}
              height={"24px"}
            />
            </LinksGroup>
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Betazed"
              isHeader
              link="/app/dao/betazed"
              index="main"
            >
              <img
                src={daoIcon}
                alt="dao"
                width={"24px"}
                height={"24px"}
              />
            </LinksGroup>
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Risa"
              isHeader
              link="/app/dao/jan"
              index="main"
            >
              <img
                src={daoIcon}
                alt="dao"
                width={"24px"}
                height={"24px"}
              />
            </LinksGroup>
          </ul>
          <ul className={s.downNav}>
            <hr />
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Reputation"
              isHeader
              link="/app/reputation"
              index="main"
              >
              <img
                src={reputationIcon}
                alt="reputation"
                width={"24px"}
                height={"24px"}
              />
            </LinksGroup>
          </ul>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    alertsList: store.alerts.alertsList,
    activeItem: store.navigation.activeItem,
    navbarType: store.navigation.navbarType,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
