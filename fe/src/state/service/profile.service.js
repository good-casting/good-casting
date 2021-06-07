const { default: axios } = require('axios');

const SERVER = 'http://localhost:8080';

// const userInfo =
//     typeof window !== `undefined`
//         ? JSON.parse(localStorage.getItem('USER'))
//         : null;

const profileList = (pageRequest) => {
    console.log(
        'service profileList pageRequest: ' + JSON.stringify(pageRequest)
    );
    return axios({
        url: `${SERVER}/profiles/list`,
        method: 'post',
        data: pageRequest,
        headers: { Authorization: localStorage.getItem('TOKEN') },
    });
};

const profileRegister = (arg) => {
    return axios({
        url: `${SERVER}/profiles/register`,
        method: 'post',
        data: arg,
        headers: {
            // 'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem('TOKEN'),
        },
    });
};

export default { profileList, profileRegister };
