import React from "react";
import Signup from "./signup";
import Login from "./login";
import Main from "./main";
import Dictionnary from "./Dictionnary"
import { Routes, Route } from 'react-router-dom';


function App() {
    return (
        <div>
            
            <Routes>
                <Route path='/' element={<Signup/>}/>
                    <Route path='/signup' element={<Signup/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/main' element={<Main/>}/>
                    <Route path='/Dictionnary' element={<Dictionnary/>}/>

                </Routes>
            
        </div>
    );
}

export default App;
