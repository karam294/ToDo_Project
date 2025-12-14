import React, { useState } from "react";
import axios from "axios";
import {Link}from 'react-router-dom';
import './signup.css';

const API_URL = process.env.REACT_APP_API_URL;


const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/create-account`, formData);
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.error || "Something went wrong!");
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Create Account</button>
                <Link to='/login'>login</Link>
            </form>
            {message && <p>{message}</p>}
            
        </div>
    );
};

export default Signup;
