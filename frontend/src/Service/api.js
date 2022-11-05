import axios from 'axios';

export const getExpenses = async () => {
    return axios
        .get('http://www.student-8.sutdacademytools.net:3007')
        .then(result => { return result; });
};