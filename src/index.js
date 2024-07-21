import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './components/App';
import './style/index.css';
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);