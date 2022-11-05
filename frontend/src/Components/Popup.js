import { Button, Header, Image, Modal, Label, Input, Grid, Form, GridRow, GridColumn } from 'semantic-ui-react'
import { useEffect, useState } from 'react';
import { getExpenses, addExpense, updateExpense } from '../Service/api';

const Popup = ({ open, setClose, mode='add', presentValues }) => {
  console.log(presentValues)
  let [item, setItem] = useState(presentValues?.item);
  let [cost, setCost] = useState(presentValues?.cost);
  let index = presentValues?.index;

  useEffect(() => {
    setItem(presentValues?.item);
    setCost(presentValues?.cost);
    index= presentValues?.index;
  }, [open]);

  const handleSubmit = () => {
    if (mode === 'add') {
      addExpense(item, cost);
    } 
    else {
      updateExpense(index, item, cost);
    }
    setClose();
  }

  return (
    <Modal
      onClose={setClose}
      // onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Expense</Modal.Header>
      <Modal.Content image>
        <Grid>
          <GridRow>
            <GridColumn>
              <Form>
                <Form.Input
                  label='Expense Item'
                  placeholder='Item'
                  onChange={(e, data) => {setItem(data.value)}}
                  value={item}
                />
                <Form.Input
                  label='Cost'
                  placeholder='Cost'
                  onChange={(e, data) => {setCost(data.value)}}
                  value={cost}
                />
              </Form>
            </GridColumn>
          </GridRow>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={setClose}>
          Cancel
        </Button>
        <Button positive onClick={handleSubmit}>
          OK 
        </Button>
      </Modal.Actions>
    </Modal>
  )
};

export default Popup;