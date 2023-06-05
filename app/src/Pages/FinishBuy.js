import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import Header from '../Components/Header';
import Footer from '../Components/Footer';


const FinishBuy = () => {

    return (
        <>
            <Header />
            <div className="finish-buy content">
                compras
            </div>
            <Footer />
        </>
    );
};

export default FinishBuy;