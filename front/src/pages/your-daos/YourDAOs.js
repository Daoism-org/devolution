import React from "react";
import { Row, Col, Table, FormGroup, Button, Input } from "reactstrap";

import Widget from "../../components/Widget/Widget";

import s from "./YourDAOs.module.scss";
import Identicon from '../../util/Identicon';

import ApexChart from "react-apexcharts";
import { chartData } from "./chartsMock";

class YourDAOs extends React.Component {

  render() {
    return (
      <div className={s.root}>
        <Row>
          <Col sm={7}>
            <Row>
              <Col sm={12}>
                <Widget
                  title={<p className={"fw-bold"}>Introduction</p>}
                >
                  <Identicon seed={"ANGEL"} size={6}/>
                  <span>Planet angel</span>
                </Widget>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <Widget
                  title={<p className={"fw-bold"}>Discover active proposals</p>}
                >
                  <Table className={"mb-0"} borderless responsive>
                    <thead>
                      <tr>
                        <th key={0} scope="col" className={"pl-0"}>
                          Id
                        </th>
                        <th key={1} scope="col" className={"pl-0"}>
                          Initiator
                        </th>
                        <th key={2} scope="col" className={"pl-0"}>
                          Title
                        </th>
                        <th key={3} scope="col" className={"pl-0"}>
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-dark">
                      <tr key={0}>
                        <td className="fw-thin pl-0 fw-thin">
                          <i className={`fa fa-circle text-info mr-3`} />
                          #0004
                        </td>
                        <td className={"pl-0 fw-thin"}>
                          <Identicon seed={"0x97af3436acA4c78b9d431c43a0Ae5479eCbB796D"} size={12}/>
                          0x97af..
                        </td>
                        <td className={"pl-0 fw-thin"}>Number of NFT ID's</td>
                        <td className={"pl-0 fw-thin"}>01 Jan 2021</td>
                      </tr>
                      <tr key={1}>
                        <td className="fw-thin pl-0 fw-thin">
                          <i className={`fa fa-circle text-info mr-3`} />
                          #0005
                        </td>
                        <td className={"pl-0 fw-thin"}>
                          <Identicon seed={"0x97af3436acA4c78b9d431c43a0Ae5479eCbB796D"} size={12}/>
                          0x97af..
                        </td>
                        <td className={"pl-0 fw-thin"}>Number of NFT ID's</td>
                        <td className={"pl-0 fw-thin"}>02 Jan 2021</td>
                      </tr>
                    </tbody>
                  </Table>
                </Widget>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <Widget
                  title={<p className={"fw-bold"}>Archived proposals</p>}
                >
                  <Table className={"mb-0"} borderless responsive>
                    <thead>
                      <tr>
                        <th key={0} scope="col" className={"pl-0"}>
                          Id
                        </th>
                        <th key={1} scope="col" className={"pl-0"}>
                          Initiator
                        </th>
                        <th key={2} scope="col" className={"pl-0"}>
                          Title
                        </th>
                        <th key={3} scope="col" className={"pl-0"}>
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-dark">
                      <tr key={0}>
                        <td className="fw-thin pl-0 fw-thin">
                          <i className={`fa fa-circle text-danger mr-3`} />
                          #0001
                        </td>
                        <td className={"pl-0 fw-thin"}>
                          <Identicon seed={"0x97af3436acA4c78b9d431c43a0Ae5479eCbB796D"} size={12}/>
                          0x97af..
                        </td>
                        <td className={"pl-0 fw-thin"}>Number of NFT ID's</td>
                        <td className={"pl-0 fw-thin"}>01 Jan 2021</td>
                      </tr>
                      <tr key={1}>
                        <td className="fw-thin pl-0 fw-thin">
                          <i className={`fa fa-circle text-success mr-3`} />
                          #0002
                        </td>
                        <td className={"pl-0 fw-thin"}>
                          <Identicon seed={"0x97af3436acA4c78b9d431c43a0Ae5479eCbB796D"} size={12}/>
                          0x97af..
                        </td>
                        <td className={"pl-0 fw-thin"}>Number of NFT ID's</td>
                        <td className={"pl-0 fw-thin"}>02 Jan 2021</td>
                      </tr>
                      <tr key={1}>
                        <td className="fw-thin pl-0 fw-thin">
                          <i className={`fa fa-circle text-success mr-3`} />
                          #0003
                        </td>
                        <td className={"pl-0 fw-thin"}>
                          <Identicon seed={"0x97af3436acA4c78b9d431c43a0Ae5479eCbB796D"} size={12}/>
                          0x97af..
                        </td>
                        <td className={"pl-0 fw-thin"}>Number of NFT ID's</td>
                        <td className={"pl-0 fw-thin"}>03 Jan 2021</td>
                      </tr>
                    </tbody>
                  </Table>
                </Widget>
              </Col>
            </Row>
          </Col>
          <Col sm={5}>
            <Widget
              title={<p className={"fw-bold"}>#0001 - Number of NFT ID's</p>}
            >
              <Widget title={<p className={"fw-bold"}>Information</p>}>
                <span><b>Need:</b> 0 NFT Id / 0 Rep. / 0 Gouv.</span><br/>
                <span><b>Start date:</b> 10/10/10</span><br/>
                <span><b>Expire date:</b> 10/10/10</span>
              </Widget>

              <Widget title={<p className={"fw-bold"}>Vote</p>}>
                <FormGroup>
                  <Input type="select" name="select" className={`${s.voteSelect}`}>
                    <option>Yes</option>
                    <option>No opinion</option>
                    <option>No</option>
                  </Input>
                  <Button color="light">Vote</Button>{' '}
                </FormGroup>
              </Widget>
              <Widget title={<p className={"fw-bold"}>Voting Status</p>}>
                <Row
                  className={`${s.row} justify-content-center`}
                  noGutters
                  style={{ marginBottom: 30, marginTop: 24 }}
                >
                  <ApexChart
                    className="sparkline-chart"
                    type={"donut"}
                    height={180}
                    series={chartData.apex.pie.series}
                    options={chartData.apex.pie.options}
                  />
                </Row>
                <Row className={`justify-content-between`}>
                  <Col sm={4}>
                    <div className={`${s.pieElementsSuccess} ${s.pieElements}`}>
                      <h4 className={"mt-3 mb-1"}>25</h4>
                      <p>Yes</p>
                    </div>
                  </Col>
                  <Col sm={4}>
                    <div className={`${s.pieElementsGray} ${s.pieElements}`}>
                      <h4 className={"mt-3 mb-1"}>2</h4>
                      <p>No opinion</p>
                    </div>
                  </Col>
                  <Col sm={4}>
                    <div className={`${s.pieElementsDanger} ${s.pieElements}`}>
                      <h4 className={"mt-3 mb-1"}>15</h4>
                      <p>No</p>
                    </div>
                  </Col>
                </Row>
              </Widget>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default YourDAOs;
