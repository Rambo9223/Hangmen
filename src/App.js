/*Our app file contains our css imports for bootstrap & app,
our components, you'll see that our DictionaryFilteredWord has the 
GetWord function passed as props to send an array of 100 numbers to it 
to narrrow down the word selection of the app. */
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import GetWord from './Components/GetWordIndexes';
import DictionaryFilteredWord from './Components/DictionaryFilteredWord';
import Heading from './Components/Heading';
import UserInput from './Components/UserInput';

function App() {
  return (
    <>
    <div className='App-header'>
    <Heading/>
    <DictionaryFilteredWord index={GetWord()}/>
    <UserInput/>
    </div>
    </>
  );
}



export default App;
