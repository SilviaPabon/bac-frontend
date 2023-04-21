import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<div className="max-w-screen-md mx-auto border">
			<h1 className="text-2xl text-center">Hello, world!</h1>
		</div>
	</React.StrictMode>,
);
