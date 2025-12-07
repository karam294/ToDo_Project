import React from "react";
import Signup from "./frontend/signup";
import Login from "./frontend/login";
import Main from "./frontend/main";
import Dictionnary from "./frontend/Dictionnary"
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
