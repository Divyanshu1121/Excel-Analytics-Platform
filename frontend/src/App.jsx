import { jwtDecode } from "jwt-decode";
import { Navigate, BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react';
import './App.css'
import Landing from './components/Landing'
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PrivateRoute from "./components/PrivateRoute";
import Upload from './components/Upload';
import AdminPanel from './components/AdminPanel';
import AdminUploads from './components/AdminUploads';
// import Users from './components/UsersList';
import UsersList from "./components/UsersList";
import Stats from "./components/Stats";

function App() {
  const token = localStorage.getItem("token");
  let currentUser = null;

  if (token) {
    try {
      const user = jwtDecode(token);
    } catch (err) {
      console.error("Invalid token", err);
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/upload" element={<PrivateRoute><Upload /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
        <Route path="/admin/uploads" element={<PrivateRoute><AdminUploads /></PrivateRoute>} />
        <Route path="/admin/users" element={<UsersList />} />
        <Route path="/admin/stats" element={<Stats />} />
      </Routes >
    </BrowserRouter>
  )
}

export default App
