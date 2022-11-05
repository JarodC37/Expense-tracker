const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express()
const port = 3007
const databaseFile = './database.json'

app.use(cors());

const readFile = () => {
  let rawdata = fs.readFileSync(databaseFile);
  return JSON.parse(rawdata);
}

const addToList = (data, entry) => {
  let newIdx = data['expenses'].length === 0 ? 1 : Number(data['expenses'].at(-1).id) + 1;
  data['expenses'].push({
    "id": newIdx.toString(),
    "name": entry.item,
    "value": entry.value
  });
  return data;
}

const updateItem = (data, fields) => {
  let objIdx = data['expenses'].findIndex((obj => obj.id === fields.idx))

  data['expenses'][objIdx].name = fields.item;
  data['expenses'][objIdx].value = fields.value;

  return data;
};

const deleteFromList = (data, idx) => {
  let list = data['expenses'].filter(item => item.id !== idx);
  data['expenses'] = list;
  return data;
}

app.get('/', (req, res) => {
  let expenseData = readFile();
  console.log(expenseData);
  // res.append('Access-Control-Allow-Origin', ['*']);
  res.send(expenseData);
})

/**
 * Query params:
 * item - name
 * value - cost
 */
app.post('/addItem', (req, res) => {
  let expenseData = readFile();

  fs.writeFileSync(databaseFile, JSON.stringify(addToList(expenseData, req.query), null, 4));
  // res.append('Access-Control-Allow-Origin', ['*']);
  res.send("Record successfully updated");
})

/**
 * Query params:
 * item - name
 * value - cost
 * idx - index to update
 */
app.post('/updateItem', (req, res) => {
  let expenseData = readFile();
  

  fs.writeFileSync(databaseFile, JSON.stringify(updateItem(expenseData, req.query), null, 4));
  // res.append('Access-Control-Allow-Origin', ['*']);
  res.send('Record successfully updated');
});

/**
 * Query params:
 * index - index of record
 */
app.post('/delete', (req, res) => {
  let idx = req.query.index;
  let expenseData = readFile();

  fs.writeFileSync(databaseFile, JSON.stringify(deleteFromList(expenseData, idx), null, 4));
  // res.append('Access-Control-Allow-Origin', ['*']);
  res.send("Record successfully deleted");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})