import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// a simple function to display a modal component when user clicks a button 
function DisplayModal(props) {

  // the title,body and text values are supplied as props

  let body = props.body;
  let buttonText = props.buttonText;
  let buttonVariant = props.buttonVariant;
  let title = props.title;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant={buttonVariant} onClick={handleShow}>{buttonText}</Button>


      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{"textAlign":"center","margin":"0 auto",
          "paddingLeft":"75px"
          }}>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{"textAlign":"center","margin":"0 auto"}}>
          {body}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DisplayModal;