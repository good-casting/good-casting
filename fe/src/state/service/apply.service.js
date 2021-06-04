const { default: axios } = require('axios')

const SERVER = 'http://localhost:8080'

const hireApply = (arg) => {
    console.log("service hireApply : " + JSON.stringify(arg))
    return axios ({
        url: `${SERVER}/applies/doApply`,
        method: "post",
        data: arg,
        headers: {
            Authorization: localStorage.getItem("TOKEN")
        }
    })
}

export default { hireApply }
