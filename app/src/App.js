import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";

import Home from './Pages/Home';
import Login from './Pages/Login';
import AboutUs from './Pages/AboutUs';

// define as rotas da aplicação para cada componente
const App = () => {
    // lista das informações de ítens para teste
    const itensTest = [
        {id: 0, name: 'Ilha Osasco', price: 9011.9, srcImage: './img/produtos/ilha1.png', stock: 4, sold: 1, coord:[-15.2, -65.1], description: 'Descr de Ilha Osasco agora vem algumas enrolações bla bla bla texto texto texto grande enrolação bla bla bla ihuuuu. Enrolação muito texto, eu não aguento mais o semestre bla bla bla texto texto constitucional.'},
        {id: 1, name: 'Apt bom', price: 5555, srcImage: './img/produtos/apt2.png', stock: 1, sold: 12, coord:[0, 0], description: 'Descr de Apt bom agora vem algumas enrolações bla bla bla texto texto texto grande enrolação bla bla bla ihuuuu. Enrolação muito texto, eu não aguento mais o semestre bla bla bla texto texto constitucional.'},
        {id: 2, name: 'Apt ótimo', price: 123444.9, srcImage: './img/produtos/apt3.png', stock: 9, sold: 15, coord:[-12.2, 55.1], description: 'Descr de Apt ótimo agora vem algumas enrolações bla bla bla texto texto texto grande enrolação bla bla bla ihuuuu. Enrolação muito texto, eu não aguento mais o semestre bla bla bla texto texto constitucional.'},
        {id: 3, name: 'ICMC', price: 789.23, srcImage: './img/produtos/apt2.png', stock: 12, sold: 9, coord:[-22, -47.1], description: 'Descr de ICMC agora vem algumas enrolações bla bla bla texto texto texto grande enrolação bla bla bla ihuuuu. Enrolação muito texto, eu não aguento mais o semestre bla bla bla texto texto constitucional.'},
        {id: 4, name: 'Ilha Bela', price: 23401.9, srcImage: './img/produtos/ilha1.png', stock: 4, sold: 3, coord:[-2.2, -31], description: 'Descr de Ilha Bela agora vem algumas enrolações bla bla bla texto texto texto grande enrolação bla bla bla ihuuuu. Enrolação muito texto, eu não aguento mais o semestre bla bla bla texto texto constitucional.'},
        {id: 5, name: 'Apt Del mar', price: 9011.2, srcImage: './img/produtos/apt2.png', stock: 3, sold: 7, coord:[-25.8, 0], description: 'Descr de Apt Del mar agora vem algumas enrolações bla bla bla texto texto texto grande enrolação bla bla bla ihuuuu. Enrolação muito texto, eu não aguento mais o semestre bla bla bla texto texto constitucional.'},
        {id: 6, name: 'Apt Romeo', price: 903414.9, srcImage: './img/produtos/apt3.png', stock: 8, sold: 91, coord:[-14.2, 35.1], description: 'Descr de Apt Romeo agora vem algumas enrolações bla bla bla texto texto texto grande enrolação bla bla bla ihuuuu. Enrolação muito texto, eu não aguento mais o semestre bla bla bla texto texto constitucional.'},
        {id: 7, name: 'IFSC', price: 666.66, srcImage: './img/produtos/apt2.png', stock: 7, sold: 32, coord:[87.2, -45.5], description: 'Descr de IFSC agora vem algumas enrolações bla bla bla texto texto texto grande enrolação bla bla bla ihuuuu. Enrolação muito texto, eu não aguento mais o semestre bla bla bla texto texto constitucional.'},
        {id: 8, name: 'Austrália', price: 4569823.95, srcImage: './img/produtos/ilha1.png', stock: 2, sold: 2, coord:[12.2, 9.8], description: 'Descr de Austrália agora vem algumas enrolações bla bla bla texto texto texto grande enrolação bla bla bla ihuuuu. Enrolação muito texto, eu não aguento mais o semestre bla bla bla texto texto constitucional.'},
        {id: 9, name: 'Apt Londres', price: 456.12, srcImage: './img/produtos/apt2.png', stock: 16, sold: 8, coord:[81.7, 81.1], description: 'Descr de Apt Londres agora vem algumas enrolações bla bla bla texto texto texto grande enrolação bla bla bla ihuuuu. Enrolação muito texto, eu não aguento mais o semestre bla bla bla texto texto constitucional.'},
        {id: 10, name: 'Casa na praia', price: 7888000.90, srcImage: './img/produtos/apt3.png', stock: 89, sold: 23, coord:[12.8, -55.1], description: 'Descr de Casa na praia agora vem algumas enrolações bla bla bla texto texto texto grande enrolação bla bla bla ihuuuu. Enrolação muito texto, eu não aguento mais o semestre bla bla bla texto texto constitucional.'},
        {id: 11, name: 'Apt ilhado', price: 7899999.23, srcImage: './img/produtos/apt2.png', stock: 15, sold: 17, coord:[10.2, 5.2], description: 'Descr de Apt ilhado agora vem algumas enrolações bla bla bla texto texto texto grande enrolação bla bla bla ihuuuu. Enrolação muito texto, eu não aguento mais o semestre bla bla bla texto texto constitucional.'},
    ];

    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Home dataItens={itensTest}/>} />
                <Route path="/home" exact element={<Home dataItens={itensTest}/>} />
                <Route path="/login" exact element={<Login />}/>
                <Route path="/about-us" exact element={<AboutUs />}/>
            </Routes>
        </Router>
    );
};

export default App;