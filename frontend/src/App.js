import logo from './logo.svg';
import './App.css';
import { getExpenses, deleteExpense, updateExpense } from './Service/api';
import { useState, useEffect } from 'react';
import Popup from './Components/Popup';
import { Button, Divider, Container } from 'semantic-ui-react'
import ExpenseList from './Components/ExpenseList';


const App = () => {
  const [data, setData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMode, setPopupMode] = useState(null);
  const [element, setElement] = useState(false);

  useEffect(() => {
    getExpenses()
      .then(result => {
        setData(result.data)
      });
  }, []);

  const setClosePopup = () => {
    setShowPopup(false);
    setElement(null);
    getExpenses()
      .then(result => {
        setData(result.data)
      });
  };

  const addPopup = () => {
    setPopupMode('add');
    setShowPopup(true);
  };

  const updatePopup = (id, name, value) => {
    setElement({ index: id, item: name, cost: value });
    setPopupMode('update');
    setShowPopup(true);
  }

  const deleteItem = (id) => {
    deleteExpense(id);
    getExpenses()
    .then(result => {
      setData(result.data)
    });
  }

  return (
    <div className="App" >
      <Popup open={showPopup} setClose={setClosePopup} mode={popupMode} presentValues={element}></Popup>
      <header padding='10px'>
        <h1>Expense tracker</h1>
      </header>
      <br />
      <Button onClick={addPopup} >Add expense</Button>
      <Divider />

      <Container width='50%'>
        <ExpenseList expenses={data?.expenses} updateFn={updatePopup} deleteFn={deleteItem}></ExpenseList>
      </Container>

    </div>
  );
}

export default App;
