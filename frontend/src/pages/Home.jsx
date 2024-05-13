import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';

import Home from './FirstscreenHome';
import ComponentD from './SecondscreenHome';
import ComponentF from './ThirdscreenHome';
import ComponentQ from './FourthscreenHome';


export default function Logged() {

    
    return(
        <><Home /><ComponentD /><ComponentF /><ComponentQ /></>
    
);
}