import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL : url,
    headers : { "Content-Type" : "application/json" }
})

// 목록 조회
export const getMyBills = async() => {
    const res = await api.get('/api/v1/my-bills', {
        headers : {
            "X-USER-ID" : "1"
        }
    })

    return res.data;
}

// 단건 조회
export const getMyBillDetail = async(id) => {
    const res = await api.get(`/api/v1/my-bills/${id}`, {
        headers : {
            "X-USER-ID" : "1"
        }
    })

    return res.data;
}

// 수정
export const updateMyBill = async(id, payload) => {
    const res = await api.patch(`/api/v1/my-bills/${id}`, payload,{
        headers : {
            "X-USER-ID" : "1"
        }
    })

    return res.data;
}
