import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from './header';
import './main.css';
import Modal from './modal';   
const API_URL = process.env.REACT_APP_API_URL;

const Main = ({ email }) => {
    const [userInfo, setUserInfo] = useState(null);  // User info (id, username, etc.)
    const [tasks, setTasks] = useState([]);  // Store tasks for the user
    const [loading, setLoading] = useState(true);  // Handle loading state
    const [isModalOpen, setIsModalOpen] = useState(false);  // State to control modal visibility
    const openModal = () => {
      setIsModalOpen(true);  // Set modal to open
  };
  
  const closeModal = () => {
      setIsModalOpen(false);  // Set modal to close
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, due_date } = e.target.elements;  // Get form values

    try {
        // Sending the new task to the backend
        await axios.post(`${API_URL}/addTask`, {
            user_id: userInfo.id,  // Send the user ID along with the task data
            title: title.value,
            description: description.value,
            due_date: due_date.value,
        });

        // After successful task creation, close the modal and fetch tasks again
        closeModal();
        // Optionally, refresh the tasks list
        const response = await axios.get(`${API_URL}/getTasks?userId=${userInfo.id}`);
        setTasks(response.data);
    } catch (error) {
        console.error("Error adding task:", error);
    }
};
  

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                // Fetch user info based on the email
                const response = await axios.get(`${API_URL}/getUserInfo?email=${email}`);
                setUserInfo(response.data);  // Set user data (id, username, email)

                // After user info is fetched, fetch tasks
                const tasksResponse = await axios.get(`${API_URL}/getTasks?userId=${response.data.id}`);
                setTasks(tasksResponse.data);  // Set tasks data
            } catch (error) {
                console.error("Error fetching user info or tasks:", error);
            } finally {
                setLoading(false);  // Set loading to false after data is fetched
            }
        };

        fetchUserInfo();
    }, [email]);  // Only run when the email changes
 // Function to handle task deletion
 const handleDelete = async (taskId) => {
  try {
      // Send request to delete task
      await axios.delete(`${API_URL}/deleteTask/${taskId}`);

      // After deletion, remove the task from the state
      setTasks(tasks.filter(task => task.id !== taskId));  // Filter out the deleted task
  } catch (error) {
      console.error("Error deleting task:", error);
  }
};
    // Display loading state or actual content
    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container">
          

            {userInfo ? (
              <Header username={userInfo.username} />                //<h1>Welcome, {userInfo.username}!</h1>  // Display user's name
            ) : (
                <p>User info not found.</p>
            )}
<div><button className="add-task-button" onClick={openModal}>Add New Task</button>

            <h2>Your Tasks</h2>
            {tasks.length === 0 ? (
                <p>No tasks available.</p>
            ) : (
              <ul>
              {tasks.map((task) => (
                  <li key={task.id} className="task-item">
                      <div className="task-title">
                          <h3>{task.title}</h3>
                          {/*<span className="due-date">{task.due_date}</span> */} {/* Display due date next to title */}
                          <button 
                                    onClick={() => handleDelete(task.id)} 
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                      </div>
                      <p className="task-description">{task.description}</p>  {/* Display description underneath */}
                  </li>
              ))}
          </ul>
          
          
            )}
            <Modal 
    isOpen={isModalOpen} 
    closeModal={closeModal} 
    handleSubmit={handleSubmit} 
/>
</div>
        </div>
    );
};// Example inline styles for layout
/*
const taskItemStyle = {
    marginBottom: '15px',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
};

const taskTitleStyle = {
    display: 'flex', 
    justifyContent: 'space-between', // Title and due date on the same line
    alignItems: 'center',
};

const dueDateStyle = {
    fontStyle: 'italic',
    color: '#888', // Light gray for due date
};

const taskDescriptionStyle = {
    marginTop: '5px', // Space between title and description
    fontSize: '14px',
    color: '#555', // Darker color for the description text
};*/


export default Main;
