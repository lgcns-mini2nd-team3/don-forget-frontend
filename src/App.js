import './App.css';
import { useEffect } from 'react';
import myBillApi from './api/getMyBills';
import MyBillPage from './pages/myBill/MyBillPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  useEffect(() => {
    myBillApi()
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
