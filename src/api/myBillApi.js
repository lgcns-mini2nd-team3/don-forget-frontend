import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL : url,
    headers : { "Content-Type" : "application/json" }
})


const myBillApi = async() => {
    const res = await api.get('/api/v1/my-bills', {
        headers : {
            "X-USER-ID" : "1"
        }
    })

    return res.data;
}

export default myBillApi;