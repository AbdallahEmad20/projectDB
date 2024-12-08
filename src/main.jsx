
// import ReactDOM from 'react-dom/client'; // استخدم 'react-dom/client' بدلاً من 'react-dom'
// import { Provider } from 'react-redux';


// // import TableData from './componente/TableData/TableData';
import store from './redux/store';
// import App from './App';

// // حدد العنصر الجذر
// const rootElement = document.getElementById('root');

// // أنشئ الـ root
// const root = ReactDOM.createRoot(rootElement);

// // قم بالعرض باستخدام createRoot
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );


// src/main.jsx  

import ReactDOM from 'react-dom/client';  
import { Provider } from 'react-redux';  

import App from './App';  
import './index.css';  


ReactDOM.createRoot(document.getElementById('root')).render(  
    <Provider store={store}>  
        <App />  
    </Provider>  
);