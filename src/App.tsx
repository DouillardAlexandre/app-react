/**
 * APP
 */

import { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//styles
import '@/style/App.css';

//routes
import _ErrorRoute from '@/routes/_error.route';
import _HomeRoute from '@/routes/_home.route';

function App() {

  return (
  <Suspense fallback="loading">
    <BrowserRouter>

      <Routes>

        <Route path="/home" element={<_HomeRoute/>} />

        <Route path="/error" element={<_ErrorRoute/>} />

        <Route path="/" element={<Navigate replace to="/home" />} />

  {/*}
        <Route path="*" element={<_HomeRoute/>} />
*/}
        
      </Routes>

    </BrowserRouter>
  </Suspense>
  );
}

export default App;