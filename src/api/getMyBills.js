import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL : url,
    headers : { 
        "Content-Type" : "application/json",
        "X-USER-ID" : "1"
    }
})

// 목록 조회
export const getMyBills = async() => {
    const res = await api.get('/api/v1/my-bills')

    return res.data;
}

// 단건 조회
export const getMyBillDetail = async(id) => {
    const res = await api.get(`/api/v1/my-bills/${id}`)

    return res.data;
}

// 수정
export const updateMyBill = async(id, payload) => {
    const res = await api.patch(`/api/v1/my-bills/${id}`, payload)

    return res.data;
}

// 삭제
export const deleteMyBill = async(id) => {
    const res = await api.delete(`/api/v1/my-bills/${id}`)

    return res.data;
}
