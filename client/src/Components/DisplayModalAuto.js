import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// a simple function to display a modal component
// this modal will open on an automatic event
function DisplayModalAuto(props) {


  // the title,body,text and handle close function are supplied as props
  let body = props.body;
  let title = props.title;
  let show = props.show;
  let handleClose = props.handleClose;


  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        
      >
        <Modal.Header closeButton>
          <Modal.Title >{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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

export default DisplayModalAuto;