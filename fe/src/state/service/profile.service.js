const { default: axios } = require('axios');

const SERVER = 'http://localhost:8080';
const userInfo =
    typeof window !== `undefined`
        ? JSON.parse(localStorage.getItem('USER'))
        : null;

const profileList = (pageRequest) => {
    console.log('service profileList pageRequest: ' + JSON.stringify(pageRequest));
    return axios({
        url: `${SERVER}/profile/list`,
        method: 'post',
        data: {
            page: pageRequest.page,
            size: pageRequest.size,
            sort: pageRequest.sort,
            pageRequest
        },

        headers: { Authorization: 'JWT fefege..' },
    });
};

const profileRead = () => {
    return axios({
        url: `${SERVER}/profile/detail/${userInfo[1].profileId}`,
        method: 'get',
        headers: { Authorization: localStorage.getItem('token')},
    })
}


export default { profileList, profileRead};