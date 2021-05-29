const { default: axios } = require('axios');

const SERVER = 'http://localhost:8080';

const hireList = (pageRequest) => {
    console.log('service hireList pageRequest: ' + JSON.stringify(pageRequest));
    return axios({
        url: `${SERVER}/hires/list`,
        method: 'post',
        data: pageRequest,
        headers: { Authorization: 'JWT fefege..' },
    });
};



export default { hireList };