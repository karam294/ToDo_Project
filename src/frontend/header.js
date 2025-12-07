import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ username }) => {
    return (
        <header style={headerStyle}>
            <div style={welcomeStyle}>
                {/* Welcome message */}
                <h1 style={{ color: 'white' }}>Welcome, {username}!</h1>
            </div>
            <nav>
                <ul style={navStyle}>
                    {/* Navigation links */}
                    <li><Link to="/" style={linkStyle}>Home</Link></li>
                    <li><Link to="/Dictionnary" style={linkStyle}>Dict</Link></li>
                    <li><Link to="/profile" style={linkStyle}>Profile</Link></li>
                </ul>
            </nav>
        </header>
    );
};

// Inline styling for the header and other elements
const headerStyle = {
    display: 'flex',            // Use flexbox for layout
    justifyContent: 'space-between', // Space between left and right content
    //alignItems: 'center',       // Vertically align the items
    backgroundColor: '#333',    // Dark background color
    color: 'white',             // White text color
    padding: '10px 20px',       // Padding around the header
    position: 'fixed',          // Make the header fixed at the top
    width: '100%', 
    height:'20%',             // Full width of the page
    top: 0,  
    left:0,                   // Align the header to the top of the page
    zIndex: 1000,               // Ensure it stays above other content
};

const welcomeStyle = {
    flex: 1,                    // Make the welcome div take as much space as possible
    textAlign: 'left',          // Align text to the left
    top:0,
};

const navStyle = {
    listStyleType: 'none',      // Remove default list style
    padding: '0',               // Remove default padding
    margin: '0',                // Remove margin to keep it aligned
    display: 'flex',            // Use flexbox for navigation items
    justifyContent: 'flex-end', // Align the navigation items to the right
};

const linkStyle = {
    color: 'white',             // White text for the links
    textDecoration: 'none',     // Remove underline
    marginLeft: '20px',         // Add some space between the links
    fontSize: '16px',           // Slightly bigger text for readability
};

export default Header;
