import axios from 'axios';
import api from './axios';

// const url = process.env.REACT_APP_API_URL;

// const api = axios.create({
//     baseURL : url,
//     headers : { 
//         "Content-Type" : "application/json",
//         "X-USER-ID" : "1"
//     }
// })

const API_BASE_URL = "my-bill-service/api/v1/my-bills";

// 생성
export const createMyBill = async(payload) => {
    const res = await api.post(`${API_BASE_URL}`, payload);
    
    return res.data;
}

// 목록 조회
export const getMyBills = async() => {
    const res = await api.get(`${API_BASE_URL}`)

    return res.data;
}

// 단건 조회
export const getMyBillDetail = async(id) => {
    const res = await api.get(`${API_BASE_URL}/${id}`)

    return res.data;
}

// 수정
export const updateMyBill = async(id, payload) => {
    const res = await api.patch(`${API_BASE_URL}/${id}`, payload)

    return res.data;
}

// 삭제
export const deleteMyBill = async(id) => {
    const res = await api.delete(`${API_BASE_URL}/${id}`)

    return res.data;
}
