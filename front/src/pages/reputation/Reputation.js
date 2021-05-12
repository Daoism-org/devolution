import React from "react";
import { Row, Col } from "reactstrap";
import Widget from "../../components/Widget/Widget";

import stocksImg from "../../images/stocks.svg";
import ApexChart from "react-apexcharts";

import s from "./Reputation.module.scss";

const area = {
  series: [
    {
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ],
  options: {
    stroke: {
      show: true,
      curve: "smooth",
      width: 3,
    },
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    fill: {
      type: 'solid',
      colors: ["rgba(252, 215, 206, .25)"]
    },
    colors: ["rgba(246, 121, 93)"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        show: false,
      },
    },
    grid: {
      padding: {
        left: 5,
        right: 0,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
  },
};

const area2 = {
  series: [
    {
      data: [31, 40, 28, 51, 42, 109, 100],
    },
  ],
  options: {
    stroke: {
      show: true,
      curve: "smooth",
      width: 3,
    },
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    fill: {
      type: 'solid',
      colors: ["rgba(255, 230, 179, .25)"]
    },
    colors: ["rgba(255, 173, 1)"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        show: false,
      },
    },
    grid: {
      padding: {
        left: 5,
        right: 0,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
  },
};

class Reputation extends React.Component {
  state = {
    area: { ...area },
    area2: { ...area2 }
  };

  render() {
    return (
      <div className={s.root}>
        <Row>
          <Col xl={4}>
            <Widget
              title={<p style={{ fontWeight: 700 }}>Reputation Balance</p>}
              customDropDown
            >
              <Row className={`justify-content-between mt-3`} noGutters>
                <Col sm={8} className={"d-flex align-items-center"}>
                  <h3 className={"fw-semi-bold mb-0"}>100</h3>
                </Col>
                <Col
                  sm={4}
                  className={"d-flex align-items-center justify-content-end"}
                >
                  <img src={stocksImg} alt="" className={"mr-1"} />
                  <p className={"text-success mb-0"}>14%</p>
                </Col>
              </Row>
              <Row style={{ marginBottom: -9, marginTop: -1 }}>
                <Col sm={12}>
                  <ApexChart
                    className="sparkline-chart"
                    height={80}
                    series={this.state.area2.series}
                    options={this.state.area2.options}
                    type={"area"}
                  />
                </Col>
              </Row>
            </Widget>
          </Col>
          <Col xl={4}>
            <Widget
              title={<p style={{ fontWeight: 700 }}>Governance Token Balance</p>}
              customDropDown
            >
              <Row className={`justify-content-between mt-3`} noGutters>
                <Col sm={8} className={"d-flex align-items-center"}>
                  <h3 className={"fw-semi-bold mb-0"}>41</h3>
                </Col>
                <Col
                  sm={4}
                  className={"d-flex align-items-center justify-content-end"}
                >
                  <img src={stocksImg} alt="" className={"mr-1"} />
                  <p className={"text-success mb-0"}>6%</p>
                </Col>
              </Row>
              <Row style={{ marginBottom: -9, marginTop: -1 }}>
                <Col sm={12}>
                  <ApexChart
                    className="sparkline-chart"
                    height={80}
                    series={this.state.area.series}
                    options={this.state.area.options}
                    type={"area"}
                  />
                </Col>
              </Row>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Reputation;