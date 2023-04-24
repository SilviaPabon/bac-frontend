import { Navbar } from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import './main.css';
import { LoginPage } from './pages/LoginPage';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<AuthProvider>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path='/' element={<Navigate to='/login' replace={true} />} />
					<Route path="/login" element={<LoginPage />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	</React.StrictMode>,
);
