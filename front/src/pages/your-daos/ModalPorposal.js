import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup } from 'reactstrap';

const ModalPorposal = (props) => {

  const [modal, setModal] = useState(false);

  const [r1Selected, setR1Selected] = useState(null);
  const [r2Selected, setR2Selected] = useState(null);

  const toggle = () => setModal(!modal);

  const selectStyle = {
    width: '64%',
    backgroundColor: '#f8f9fa',
    border: '1px solid #ccc'
  }

  return (
    <div>
      <Button className="float-right" color="light" onClick={toggle}><i className={`fa fa-plus mr-2`} />Create a proposal</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create a proposal</ModalHeader>
        <ModalBody>
          <h5>Choose module</h5>
          <ButtonGroup>
            <Button color="light mr-2" onClick={() => setR1Selected(1)} active={r1Selected === 1}>Reputation</Button>
            <Button color="light mr-2" onClick={() => setR1Selected(2)} active={r1Selected === 2}>Voting</Button>
          </ButtonGroup>

          <h5 class="mt-4">Option list</h5>
          <span>* select the proposal you want to propose</span><br/>
          <select style={selectStyle} name="proposal" multiple>
            <option value ="#0004">#0004 - Distribution - Update distributed reputation</option>
            <option value ="#0005">#0005 - General Census - Update required unique voters</option>
            <option value ="#0006">#0006 - General Census - Update required aggregate reputation for a vote</option>
          </select> 
        </ModalBody>
        <ModalFooter>
          <Button color="light" onClick={toggle}>Cancel</Button>{' '}
          <Button color="primary" onClick={toggle}>Propose</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalPorposal;