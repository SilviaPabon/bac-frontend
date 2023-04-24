import './main.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<AuthProvider>
			<BrowserRouter>
			<Navbar />
				<Routes>
					<Route path='/' element={<Navigate to='/login' replace={true} />}/>
					<Route path="/login" element={<h1>Home</h1>} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	</React.StrictMode>,
);
