const { default: axios } = require('axios');

const SERVER = 'http://localhost:8080';

const fileRegister = (formData) => {
    return axios({
        url: `${SERVER}/files/register`,
        method: 'post',
        data: formData,
        headers: {
            Authorization: 'JWT fefege..',
            'Content-Type': 'multipart/form-data',
        },
    });
};

export default { fileRegister };
