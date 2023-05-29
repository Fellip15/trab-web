import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './root.css';
import App from './App';
import { CookiesProvider } from 'react-cookie';

// roda a aplicação na div 'root' do HTML
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CookiesProvider>
            <App />
    </CookiesProvider>
);