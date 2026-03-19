import './App.css';
import { useEffect } from 'react';
import myBillApi from './api/myBillApi';

function App() {
  useEffect(() => {
    myBillApi().then(console.log)
      .catch(err =>{
        console.log(err);
      })
  }, []);

  return (
    <>
      <div>test</div>
    </>
  );
}

export default App;
