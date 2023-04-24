import './main.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<AuthProvider>
			<div className="max-w-screen-md mx-auto border">
				<h1 className="text-2xl text-center">Hello, world!</h1>
			</div>
		</AuthProvider>
	</React.StrictMode>,
);
