import React from "react";
import { ListGroup, ListGroupItem, Row, Col } from "reactstrap";

import s from "./ListGroup.module.scss";

import n1 from "../../../images/people/n1.png";
import n2 from "../../../images/people/n2.png";
import arrowRight from "../../../images/arrow-right.svg";

class NotificationsDemo extends React.Component {
  render() {
    return (
      <ListGroup className={[s.listGroup, "thin-scroll"].join(" ")}>
        <p className={`${s.listGroupTitle}`}>Notifications</p>
        <p className={`${s.listGroupTime} mb-0`}>Today</p>
        <ListGroupItem className={s.listGroupItem}>
          <span className={[s.notificationIcon].join(" ")}>
            <img className="rounded-circle" src={n2} alt="..." />
          </span>
          <Row noGutters>
            <Col sm={"10"}>
              <p className="m-0 overflow-hidden">
                <span>0x97af...87f2</span> invited you to vote on {" "}
                <span>ANGEL</span> proposal <span>#0002</span>
              </p>
            </Col>
            <Col
              sm={"2"}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <time
                className={`${s.listGroupTime}`}
                style={{ fontSize: 8, padding: "6px 0 0 0" }}
              >
                9:15 AM
              </time>
            </Col>
          </Row>
        </ListGroupItem>
        <ListGroupItem className={s.listGroupItem}>
          <span className={[s.notificationIcon].join(" ")}>
            <img className="rounded-circle" src={n2} alt="..." />
          </span>
          <Row noGutters>
            <Col sm={"10"}>
              <p className="m-0 overflow-hidden">
                <span>0x97af...87f2</span> invited you to join{" "}
                <span>ANGEL</span> DAO
              </p>
            </Col>
            <Col
              sm={"2"}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <time
                className={`${s.listGroupTime}`}
                style={{ fontSize: 8, padding: "6px 0 0 0" }}
              >
                9:15 AM
              </time>
            </Col>
          </Row>
        </ListGroupItem>
        <p className={`${s.listGroupTime} mb-0`}>Yesterday</p>
        <ListGroupItem className={s.listGroupItem}>
          <span className={[s.notificationIcon].join(" ")}>
            <img className="rounded-circle" src={n1} alt="..." />
          </span>
          <Row noGutters>
            <Col sm={"10"}>
              <p className="m-0 overflow-hidden">
                <span>0x2a34...9cd5</span> invited you to join{" "}
                <span>Jan</span> DAO
              </p>
            </Col>
            <Col
              sm={"2"}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <time
                className={`${s.listGroupTime}`}
                style={{ fontSize: 8, padding: "6px 0 0 0" }}
              >
                9:15 AM
              </time>
            </Col>
          </Row>
        </ListGroupItem>
        <div className={s.seeMoreBlock}>
          <p className={`${s.seeMore} mb-3`}>See more</p>
          <img src={arrowRight} alt="arrow" className={"mb-3 mr-3"} />
        </div>
      </ListGroup>
    );
  }
}

export default NotificationsDemo;
