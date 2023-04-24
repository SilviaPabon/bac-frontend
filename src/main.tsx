import { Navbar } from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import './main.css';
import { LoginPage } from './pages/LoginPage';
import { ResidentsPage } from './pages/ResidentsPage';
import { UpdateResidentPage } from './pages/UpdateResidentPage';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<AuthProvider>
			<BrowserRouter>
				<Navbar />
				<ToastContainer />
				<Routes>
					<Route path='/' element={<Navigate to='/login' replace={true} />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/view-residents" element={<ResidentsPage />} />
					<Route path="/resident/:id" element={<UpdateResidentPage />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	</React.StrictMode>,
);
