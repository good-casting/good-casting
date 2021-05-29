const { default: axios } = require('axios');

const SERVER = 'http://localhost:8080';
const userInfo = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('USER')) : undefined;

const actorInfo = (arg) => {
    console.log('service actorInfo arg: ' + JSON.stringify(arg));
    return axios({
        url: `${SERVER}/actors/myPage/${userInfo.userId}`,
        method: 'get',
        data: arg,
        headers: { Authorization: 'JWT fefege..' },
    });
};

export default { actorInfo };