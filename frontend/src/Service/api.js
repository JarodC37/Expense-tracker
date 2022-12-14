import axios from 'axios';

export const getExpenses = async () => {
    return axios
        .get('http://www.student-8.sutdacademytools.net:3001')
        .then(result => { return result; });
};

export const addExpense = async (itemName, itemValue) => {
    return axios
        .post('http://www.student-8.sutdacademytools.net:3001/addItem', null, {
            params: {
                item: itemName,
                value: itemValue
            }
        })
        .then(result => {console.log(result)});
};

export const updateExpense = async (itemIndex, itemName, itemValue) => {
    return axios
        .post('http://www.student-8.sutdacademytools.net:3001/updateItem', null, {
            params: {
                idx: itemIndex,
                item: itemName,
                value: itemValue
            }
        })
        .then(result => {console.log(result)});
};

export const deleteExpense = async (itemIndex) => {
    return axios
        .post('http://www.student-8.sutdacademytools.net:3001/delete', null, {
            params: {
                index: itemIndex
            }
        })
        .then(result => console.log(result));
};