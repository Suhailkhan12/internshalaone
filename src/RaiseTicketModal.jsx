// src/components/RaiseTicketModal.js
import { useState } from "react";
import { firestore, auth } from "./firebase";

const RaiseTicketModal = ({ showModal, setShowModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Open");

  const handleSubmit = async () => {
    if (auth.currentUser) {
      await firestore.collection("tickets").add({
        title,
        description,
        priority,
        status,
        createdBy: auth.currentUser.email,
        createdAt: new Date(),
        assignedTo: "",
      });
      setShowModal(false);
    }
  };

  if (!showModal) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Create Ticket</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={() => setShowModal(false)}>Close</button>
      </div>
    </div>
  );
};

export default RaiseTicketModal;
