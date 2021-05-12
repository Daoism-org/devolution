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

class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      name: "Angel"
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
            <Widget
            title={<p className={"fw-bold"}>Discover the different DAO by clicking on them</p>}
            >
              <div className="table-responsive">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  {/* eslint-disable */}
                  <tbody>
                    <tr onClick={() => this.handleRowSelect(1, "Angel")} className={`${s.pointer}`}>
                      <td>#1</td>
                      <td><Identicon seed={"ANGEL"} size={6}/>Angel</td>
                      <td><Badge color="gray" className="text-gray" pill>Democracy</Badge></td>
                    </tr>
                    <tr onClick={() => this.handleRowSelect(2, "Betazed")} className={`${s.pointer}`}>
                      <td>#2</td>
                      <td><Identicon seed={"Betazed"} size={6}/>Betazed</td>
                      <td><Badge color="gray" className="text-gray" pill>Democracy</Badge></td>
                    </tr>
                    <tr onClick={() => this.handleRowSelect(3, "Risa")} className={`${s.pointer}`}>
                      <td>#3</td>
                      <td><Identicon seed={"Risa"} size={6}/>Risa</td>
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
                    <option>Assign your tokens</option>
                  </Input>
                  <Button color="light">Ok</Button>{' '}
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
