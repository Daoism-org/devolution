import React from "react";
import {
  Row,
  Col,
  Table,
  Button,
  FormGroup,
  Input,
  Badge
} from "reactstrap";
import Widget from "../../components/Widget/Widget";
import s from "./Discover.module.scss";
import Identicon from '../../util/Identicon';
import { joinSpokeDao, getJoinedSpokes } from '../../web3api';

const activeStyle = {
  color: '#29323a',
  backgroundColor: 'rgb(0 0 0 / 12%)'
}

class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      name: "Angel",
      joinedList: []
    };
  }

  handleRowSelect = (id, name) => {
    this.setState({id: id});
    this.setState({name: name});
  }

  handleBtnClick = (event) => {
    console.log("[Web3] Joining DAO " + this.state.name + "!");
    joinSpokeDao().then(res => {
      console.log("[Web3] res", res);
      if(res.hasOwnProperty('stack')){
        alert("Error while joining DAO:\n" + res["stack"])
      } else if(res.hasOwnProperty('transactionHash')){
        alert("Successfully joined DAO, transaction:\n" + res["transactionHash"])
      }
    });
  }

  componentDidMount() {
    getJoinedSpokes().then(res => {
      console.log("[Web3] Getting joined Spokes!", res);
      this.setState({joinedList: res});
    });
  }

  truncateAddr(addr) {
    return addr.substring(0, 6) + "..." + addr.substr(addr.length - 4);
  }

  render() {
    return (
      <div className={s.root}>
        <Row>
          <Col sm={7}>
            <Widget
            title={<p className={"fw-bold"}>Discover the different DAO by clicking on them</p>}
            >
              <div className="table-responsive">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  {/* eslint-disable */}
                  <tbody className={`${s.pointer}`}>
                    <tr onClick={() => this.handleRowSelect(1, "Angel")} style={this.state.id == 1 ? activeStyle : null}>
                      <td>#1</td>
                      <td>
                        <Identicon seed={"ANGEL"} size={6}/>
                        Angel
                        {this.state.joinedList.includes("0xcC066380ec146569b82b01ba007e0784b11F96A7") && 
                          <i className="fa fa-certificate ml-1" style={{color: '#0a6a66'}} title="Member"/>
                        }
                      </td>
                      <td>{this.truncateAddr("0xcC066380ec146569b82b01ba007e0784b11F96A7")}</td>
                      <td><Badge color="gray" className="text-gray" pill>Democracy</Badge></td>
                    </tr>
                    <tr onClick={() => this.handleRowSelect(2, "Betazed")} style={this.state.id == 2 ? activeStyle : null}>
                      <td>#2</td>
                      <td>
                        <Identicon seed={"Betazed"} size={6}/>
                        Betazed
                        {this.state.joinedList.includes("0x8b9564aa2c276a8b405ab593bddde405b4e8e804") && 
                          <i className="fa fa-certificate ml-1" style={{color: '#0a6a66'}} title="Member"/>
                        }
                      </td>
                      <td>{this.truncateAddr("0x8b9564aa2c276a8b405ab593bddde405b4e8e804")}</td>
                      <td><Badge color="gray" className="text-gray" pill>Democracy</Badge></td>
                    </tr>
                    <tr onClick={() => this.handleRowSelect(3, "Risa")} style={this.state.id == 3 ? activeStyle : null}>
                      <td>#3</td>
                      <td>
                        <Identicon seed={"Risa"} size={6}/>
                        Risa
                        {this.state.joinedList.includes("0x217241755170c2601e08a3da6047cbe4cc52e61a") && 
                          <i className="fa fa-certificate ml-1" style={{color: '#0a6a66'}} title="Member"/>
                        }
                      </td>
                      <td>{this.truncateAddr("0x217241755170c2601e08a3da6047cbe4cc52e61a")}</td>
                      <td><Badge color="gray" className="text-gray" pill>Democracy</Badge></td>
                    </tr>
                  </tbody>
                  {/* eslint-enable */}
                </Table>
              </div>
            </Widget>
          </Col>
          <Col sm={5}>
            <Widget
              title={<p className={"fw-bold"}>#{this.state.id} - {this.state.name} DAO</p>}
            >
              <span style={{marginBottom: '12px', display: 'block'}}>Quick description of {this.state.name}...</span>
              <Widget title={<p className={"fw-bold"}>Action(s)</p>}>
                <FormGroup>
                  <Input type="select" name="select" className={`${s.voteSelect}`}>
                    <option>Join</option>
                    <option>Assign your tokens</option>
                  </Input>
                  <Button color="light" onClick={this.handleBtnClick}>Ok</Button>{' '}
                </FormGroup>
              </Widget>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Discover;
