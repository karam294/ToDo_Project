import React, { useState } from "react"; 
import axios from "axios";
import Main from "./main";  // Assuming you have a Main component to import

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);  // Added state to track login status

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/login", formData);
            setMessage(response.data.message);
            localStorage.setItem("token", response.data.token);  // Save token in localStorage
            localStorage.setItem("username", response.data.username);  // Save username


            setLoggedIn(true);  // Set logged in to true when login is successful
        } catch (error) {
            setMessage(error.response?.data?.error || "Something went wrong!");
        }
    };

    // Render the Main component if logged in, otherwise show the login form
    if (loggedIn) {
        return <Main email={formData.email} />;  // Passing the email as a prop to Main
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
