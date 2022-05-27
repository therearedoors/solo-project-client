import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import { observe } from './Game';
import './index.css';

  const root = ReactDOM.createRoot(document.getElementById("root"));
  observe(positions => root.render(<App positions={positions}/>));
