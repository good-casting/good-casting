const { default: axios } = require("axios");

const signup = (arg) => {
    console.log("service signup arg: " + JSON.stringify(arg))
    return axios({
        url: "http://localhost:8080/users/signup",
        method: "post",
        data: arg,
        headers: {'Authorization': 'JWT fefege..'}
    })
}

const signin = (arg) => {
    console.log("service signin arg: " + JSON.stringify(arg))
    return axios({
        url: "http://localhost:8080/users/signin",
        method: "post",
        data: arg,
        headers: {'Authorization': 'JWT fefege..'}
    })
}
const hireList = (pageRequest) => {
    console.log("hire list arg: " + JSON.stringify(pageRequest))
    return axios({
        url: "http://localhost:8080/hires/list",
        method: "get",
        data: {
            
        },
        headers: {'Authorization': 'JWT fefege..'}
    })
}


export default { signup, signin, hireList}