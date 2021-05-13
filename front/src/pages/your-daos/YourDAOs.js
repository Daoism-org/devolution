import React from "react";
import { Row, Col, Table, FormGroup, Button, Input } from "reactstrap";

import Widget from "../../components/Widget/Widget";

import s from "./YourDAOs.module.scss";
import Identicon from '../../util/Identicon';

import ApexChart from "react-apexcharts";
import { chartData } from "./chartsMock";
import ModalPorposal from "./ModalPorposal";
import { castBinaryVote } from "../../web3api";

const activeStyle = {
  color: '#29323a',
  backgroundColor: 'rgb(0 0 0 / 12%)'
}

class YourDAOs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "1",
      name: "Updating the general Consensus Requirements for voter engagement from 4 NFTs to 10"
    };
  }

  handleRowSelect = (id, name) => {
    this.setState({id: id});
    this.setState({name: name});
  }

  castVote = (event) => {
    console.log(`[Web3] Voting on propsal ${this.state.id}`);
    castBinaryVote(parseInt(this.state.id, 10), true).then(res => {
      console.log("[Web3] res", res);
      if(res.hasOwnProperty('stack')){
        alert("Error while casting :\n" + res["stack"])
      } else if(res.hasOwnProperty('transactionHash')){
        alert("Successfully voted on proposal:\n" + res["transactionHash"])
      }
    });
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
                          Proposal ID
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
                      <tr key={0} onClick={() => this.handleRowSelect("1", "Updating the general Consensus Requirements for voter engagement from 4 NFTs to 10")} style={this.state.id == "0004" ? activeStyle : null}>
                        <td className="fw-thin pl-0 fw-thin">
                          <i className={`fa fa-circle text-info mr-3`} />
                          #1
                        </td>
                        <td className={"pl-0 fw-thin"}>
                          <Identicon seed={"0x97af3436acA4c78b9d431c43a0Ae5479eCbB796D"} size={12}/>
                          0x97a...
                        </td>
                        <td className={"pl-0 fw-thin"}>Updating the general Consensus Requirements for voter engagement from 4 NFTs to 10</td>
                        <td className={"pl-0 fw-thin"}>15 May 2021</td>
                      </tr>
                      <tr key={1} onClick={() => this.handleRowSelect("2", "Update required aggregate reputation for a vote from 100 to 250")} style={this.state.id == "0005" ? activeStyle : null}>
                        <td className="fw-thin pl-0 fw-thin">
                          <i className={`fa fa-circle text-info mr-3`} />
                          #2
                        </td>
                        <td className={"pl-0 fw-thin"}>
                          <Identicon seed={"0x498017d53bc83b839baf118c212fb786eb06fd81"} size={12}/>
                          0x498...
                        </td>
                        <td className={"pl-0 fw-thin"}>Update required aggregate reputation for a vote from 100 to 250</td>
                        <td className={"pl-0 fw-thin"}>17 May 2021</td>
                      </tr>
                      <tr key={2} onClick={() => this.handleRowSelect("3", "Update distributed reputation for proposing (action ID #0023) from 5 to 10")} style={this.state.id == "0006" ? activeStyle : null}>
                        <td className="fw-thin pl-0 fw-thin">
                          <i className={`fa fa-circle text-info mr-3`} />
                          #3
                        </td>
                        <td className={"pl-0 fw-thin"}>
                          <Identicon seed={"0x498017d53bc83b839baf118c212fb786eb06fd81"} size={12}/>
                          0x498...
                        </td>
                        <td className={"pl-0 fw-thin"}>Update distributed reputation for proposing (action ID #0023) from 5 to 10</td>
                        <td className={"pl-0 fw-thin"}>18 May 2021</td>
                      </tr>
                    </tbody>
                  </Table>
                  <ModalPorposal></ModalPorposal>
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
                      <tr key={0} onClick={() => this.handleRowSelect("4", "Remove voter 6 (vote ID 6) ")} style={this.state.id == "0001" ? activeStyle : null}>
                        <td className="fw-thin pl-0 fw-thin">
                          <i className={`fa fa-circle text-danger mr-3`} />
                          #4
                        </td>
                        <td className={"pl-0 fw-thin"}>
                          <Identicon seed={"0xe2b450b1fa87fea46a5079ac5abea035c3de11e5"} size={12}/>
                          0xe2b...
                        </td>
                        <td className={"pl-0 fw-thin"}>Remove voter 6 (vote ID 6)</td>
                        <td className={"pl-0 fw-thin"}>13 May 2021</td>
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
                <span><b>Need:</b> 5 NFT IDs | 100 Rep | 0 Gov</span><br/>
                <span><b>(DD/MM/YYYY)</b></span><br/>
                <span><b>Start date:</b> 10/05/2021</span><br/>
                <span><b>Expire date:</b> 15/05/2021</span>
              </Widget>

              <Widget title={<p className={"fw-bold"}>Vote</p>}>
                <FormGroup>
                  <Input type="select" name="select" className={`${s.voteSelect}`}>
                    <option>Yes</option>
                    <option>No</option>
                  </Input>
                  <Button color="light" onClick={this.castVote}>Vote</Button>{' '}
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
                  <Col sm={6}>
                    <div className={`${s.pieElementsSuccess} ${s.pieElements}`}>
                      <h4 className={"mt-3 mb-1"}>25</h4>
                      <p>Yes</p>
                    </div>
                  </Col>
                  <Col sm={6}>
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
