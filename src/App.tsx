/**
 * APP
 */

import { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios, { AxiosInstance } from 'axios';
import env from '@/env';
import Cookies from 'universal-cookie';
import { FirebaseApp, initializeApp } from 'firebase/app'
import { Auth, getAuth } from 'firebase/auth'
import { destroySession, getSessionExpirationDate } from '@/utils/session.utils';

//styles
import '@/style/App.css';

//routes
import _ErrorRoute from '@/routes/_error.route';
import _HomeRoute from '@/routes/_home.route';
import CollectionRoute from '@/routes/collection.route';
import ProfileRoute from '@/routes/profile.route';
import StatsRoute from '@/routes/stats.route'

const cookies = new Cookies()

const firebaseApp: FirebaseApp = initializeApp(env.REACT_APP_FIREBASE_CONFIG)
export const firebaseAuth: Auth = getAuth(firebaseApp)

//Instances
export const instanceBackend: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL + ":" + process.env.REACT_APP_BACKEND_PORT,
  timeout: 6000,
  headers: {
    "Accept": "application/json",
    "Content-Type" : "application/json"
  }
})

export const instanceUpload: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL + ":" + process.env.REACT_APP_UPLOAD_PORT,
  timeout: 12000,
  //maxContentLength: 5000000000, // 5Go
  //maxBodyLength: 5000000000 // 5Go
})

if(cookies.get("backendtoken")){
  instanceBackend.defaults.headers.common["backendtoken"] = cookies.get("backendtoken")
  instanceUpload.defaults.headers.common["uploadtoken"] = cookies.get("backendtoken")
}
else{
  cookies.remove("backendtoken", { path: '/' })
  instanceBackend.defaults.headers.common["backendtoken"] = ""
  instanceUpload.defaults.headers.common["uploadtoken"] = ""
}

if(cookies.get("firebasetoken")){
  instanceBackend.defaults.headers.common["firebasetoken"] = cookies.get("firebasetoken")
}
else{
  cookies.remove("firebasetoken", { path: "/" })
  instanceBackend.defaults.headers.common["firebasetoken"] = ""
}


function App() {

  if(getSessionExpirationDate() > 0 && getSessionExpirationDate() < Date.now()){
    destroySession()
  }

  return (
  <Suspense fallback="loading">
    <BrowserRouter>

      <Routes>

        <Route path="/home" element={<_HomeRoute/>} />

        <Route path="/error" element={<_ErrorRoute/>} />

        <Route path="/c" element={<CollectionRoute/>} />

        <Route path="/s" element={<StatsRoute/>} />
        <Route path="/s/:packTemplateId" element={<StatsRoute/>} />

        <Route path="/u" element={<ProfileRoute/>} />
        <Route path="/u/:alias" element={<ProfileRoute/>} />
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