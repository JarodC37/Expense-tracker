import logo from './logo.svg';
import './App.css';
import { getExpenses } from './Service/api';
import {useState, useEffect} from 'react';
import Popup from './Components/Popup';
import { Button, Header } from 'semantic-ui-react'


const App = () => {
  const [data, setData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    getExpenses()
      .then(result => setData(result.data));
  }, []);

  
  return (
    <div className="App">
      <Popup></Popup>
      <header>
        <h1>Expense tracker</h1>
      </header>
      {/* <button onClick={openModal}>Add expense</button> */}
      <Button onClick={setShowPopup(true)}>Add</Button>
      <div>
        <p>Total expenses</p>
        <p>{JSON.stringify(data)}</p>
      </div>
    </div>
  );
}

export default App;
