// Modal.js
import React from "react";

const Modal = ({ isOpen, closeModal, handleSubmit }) => {
    if (!isOpen) return null;  // Don't render the modal if it's not open

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Add New Task</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="title" placeholder="Title" required />
                    <textarea name="description" placeholder="Description" required />
                    <input type="date" name="due_date" required />
                    <div className="modal-buttons">
                        <button type="submit">Save Task</button>
                        <button type="button" onClick={closeModal}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
