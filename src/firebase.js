// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";

// Initialize Firebase with your Firebase config

const firebaseConfig = {
  apiKey: "AIzaSyD7AupjPhVKrDU9t-C_r0pHM2YrFaVsqzg",

  authDomain: "internshala-25d10.firebaseapp.com",

  projectId: "internshala-25d10",

  storageBucket: "internshala-25d10.firebasestorage.app",

  messagingSenderId: "191837536709",

  appId: "1:191837536709:web:00239d786d19ec6c1c8bac",

  //   measurementId: "G-8D4K9QMLFP",
};

// Initialize Firebase

// firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();
// const firestore = firebase.firestore();

// export { auth, firestore };
const app = initializeApp(firebaseConfig);

// Initialize services (Auth, Firestore, etc.)
const auth = getAuth(app);
const firestore = getFirestore(app);

const handleRoleAssignment = async (uid) => {
  const userRef = doc(firestore, "users", uid); // Referencing the specific document in the "users" collection
  console.log("from firebse", userRef);
  const userDoc = await getDoc(userRef); // Fetch the document

  return userDoc.exists() ? userDoc.data().role : "customer"; // Return the role or default to "customer"
};

const fetchTickets = async () => {
  // Step 1: Reference the "tickets" collection
  const ticketsCollectionRef = collection(firestore, "ticket");
  // Step 2: Fetch documents from the "tickets" collection
  const ticketsSnapshot = await getDocs(ticketsCollectionRef);

  // Step 3: Map the documents to include the document ID and data
  const ticketsData = ticketsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  // Log or return the tickets data
  console.log(ticketsData);
  return ticketsData;
};

// useEffect(() => {
//   const unsubscribe = onAuthStateChanged(
//     auth,
//     (users) => setUser(users) // Update the user state when authentication state changes
//   );

//   console.log("supported", user);

//   // Clean up the listener when the component is unmounted
//   return () => unsubscribe();
// }, [auth]);

export {
  app,
  auth,
  signInWithEmailAndPassword,
  firestore,
  handleRoleAssignment,
  fetchTickets,
};
