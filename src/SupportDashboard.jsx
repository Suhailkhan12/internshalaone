// src/components/SupportDashboard.js
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth, fetchTickets } from "./firebase";
import { useNavigate } from "react-router-dom";
import RaiseTicketModal from "./RaiseTicketModal";

const SupportDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (users) => setUser(users) // Update the user state when authentication state changes
    );

    console.log("supported", user);

    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, [auth]);

  console.log("support ticket", user);

  async function dodatacome() {
    try {
      const data = await fetchTickets();
      setTickets(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    // user ? dodatacome() : history("/login");
    if (user) {
      console.log("user present");
      dodatacome();
    } else {
      console.log("user absnt");
    }
  }, [user]);

  const handleDelete = async (ticketId) => {
    // if (user && user.role === "customer") {
    //   try {
    //     await firestore.collection("tickets").doc(ticketId).delete();
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }
  };

  const handleEdit = (ticketId) => {
    // Logic for editing a ticket
  };

  return (
    <>
      <div>
        <h2>Support Dashboard</h2>
        <table>
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Created By</th>
              <th>Assigned To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.title}</td>
                <td>{ticket.description}</td>
                <td>{ticket.priority}</td>
                <td>{ticket.status}</td>
                <td>{ticket.createdBy}</td>
                <td>{ticket.assignedTo}</td>
                <td>
                  <button onClick={() => handleEdit(ticket.id)}>Edit</button>
                  {user.role === "customer" && (
                    <button onClick={() => handleDelete(ticket.id)}>
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={() => setShowModal(true)}>Raise a Ticket</button>
      <RaiseTicketModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default SupportDashboard;
