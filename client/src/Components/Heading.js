import { InfoCircle } from "react-bootstrap-icons";
import DisplayModal from "./DisplayModal";
import Help from "./Help";


/* This is purly a display function for the heading, Users can click the help button to get the game rules. 
*/

function Heading() {

  function Icon(){
    return <>Help <InfoCircle/></>;
  };
 
  return (
    <div className="heading">
      <h1>Hangmen</h1>
      <h3>
        To start a new game click the button below.
        <br /> For help click here - 
        <DisplayModal body={<Help />} buttonText={<Icon/>} buttonVariant="primary" title="Game Rules" />
      </h3>
    </div>
  );
}

export default Heading;
