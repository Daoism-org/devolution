import React from "react";
import { Row, Col, Table, FormGroup, Button, Input } from "reactstrap";

import Widget from "../../components/Widget/Widget";

import s from "./YourDAOs.module.scss";
import Identicon from '../../util/Identicon';

import ApexChart from "react-apexcharts";
import { chartData } from "./chartsMock";

class YourDAOs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "0004",
      name: "Reduce chat rewards"
    };
  }

  handleRowSelect = (id, name) => {
    this.setState({id: id});
    this.setState({name: name});
  }

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
                  <span>Planet Angel</span>
                </Widget>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <Widget
                  title={<p className={"fw-bold"}>Discover active proposals</p>}
                >
                  <Table className="table-hover" borderless responsive>
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
                      <tr key={0} onClick={() => this.handleRowSelect("0004", "Reduce chat rewards")} className={`${s.pointer}`}>
                        <td className="fw-thin pl-0 fw-thin">
                          <i className={`fa fa-circle text-info mr-3`} />
                          #0004
                        </td>
                        <td className={"pl-0 fw-thin"}>
                          <Identicon seed={"0x97af3436acA4c78b9d431c43a0Ae5479eCbB796D"} size={12}/>
                          0x97af..
                        </td>
                        <td className={"pl-0 fw-thin"}>Reduce chat rewards</td>
                        <td className={"pl-0 fw-thin"}>9 May 2021</td>
                      </tr>
                      <tr key={1} onClick={() => this.handleRowSelect("0005", "Increase max vote length")} className={`${s.pointer}`}>
                        <td className="fw-thin pl-0 fw-thin">
                          <i className={`fa fa-circle text-info mr-3`} />
                          #0005
                        </td>
                        <td className={"pl-0 fw-thin"}>
                          <Identicon seed={"0x498017d53bc83b839baf118c212fb786eb06fd81"} size={12}/>
                          0x4980..
                        </td>
                        <td className={"pl-0 fw-thin"}>Increase max vote length</td>
                        <td className={"pl-0 fw-thin"}>10 May 2021</td>
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
                  <Table className="table-hover" borderless responsive>
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
                      <tr key={0} onClick={() => this.handleRowSelect("0001", "Lower rewards from 10 to 5")} className={`${s.pointer}`}>
                        <td className="fw-thin pl-0 fw-thin">
                          <i className={`fa fa-circle text-danger mr-3`} />
                          #0001
                        </td>
                        <td className={"pl-0 fw-thin"}>
                          <Identicon seed={"0xe2b450b1fa87fea46a5079ac5abea035c3de11e5"} size={12}/>
                          0xe2b4..
                        </td>
                        <td className={"pl-0 fw-thin"}>Lower rewards from 10 to 5</td>
                        <td className={"pl-0 fw-thin"}>4 May 2021</td>
                      </tr>
                      <tr key={1} onClick={() => this.handleRowSelect("0002", "Voting mecanism change")} className={`${s.pointer}`}>
                        <td className="fw-thin pl-0 fw-thin">
                          <i className={`fa fa-circle text-success mr-3`} />
                          #0002
                        </td>
                        <td className={"pl-0 fw-thin"}>
                          <Identicon seed={"0x95e0236A1E785E2Af0D408886973089C4C18502c"} size={12}/>
                          0x95e0..
                        </td>
                        <td className={"pl-0 fw-thin"}>Voting mecanism change</td>
                        <td className={"pl-0 fw-thin"}>6 May 2021</td>
                      </tr>
                      <tr key={2} onClick={() => this.handleRowSelect("0003", "Number of NFT ID's")} className={`${s.pointer}`}>
                        <td className="fw-thin pl-0 fw-thin">
                          <i className={`fa fa-circle text-success mr-3`} />
                          #0003
                        </td>
                        <td className={"pl-0 fw-thin"}>
                          <Identicon seed={"0x2934523cc6513a6215e463e8564c1f130be8fc44"} size={12}/>
                          0x2934..
                        </td>
                        <td className={"pl-0 fw-thin"}>Number of NFT ID's</td>
                        <td className={"pl-0 fw-thin"}>7 May 2021</td>
                      </tr>
                    </tbody>
                  </Table>
                </Widget>
              </Col>
            </Row>
          </Col>
          <Col sm={5}>
            <Widget
              title={<p className={"fw-bold"}>#{this.state.id} - {this.state.name}</p>}
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
