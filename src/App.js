import './App.css';
import { useEffect } from 'react';
import { getMyBills } from './api/getMyBills';
import MyBillPage from './pages/myBill/MyBillPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyBillDetailPage from './pages/myBill/MyBillDetailPage';

function App() {
  useEffect(() => {
    getMyBills()
      .then(console.log)
      .catch(err =>{
        console.log(err);
      })
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* --- 헤더가 없는 페이지 그룹 --- */}
        <Route path="/myBills" element={<MyBillPage />} />
        <Route path="/myBills/:id" element={<MyBillDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
