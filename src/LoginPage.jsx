// src/components/LoginPage.js
import { useState } from "react";
import {
  auth,
  firestore,
  handleRoleAssignment,
  signInWithEmailAndPassword,
} from "./firebase";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("customer@support.com");
  const [password, setPassword] = useState("customer123");
  const [error, setError] = useState("");
  const history = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log(user);

      // After successful login, fetch user role
      //   const role = await handleRoleAssignment(user.uid);

      // Set the role in the user's session or app state (you could also use context or Redux)
      //   localStorage.setItem("role", role);

      // Redirect to dashboard or home page after login
      history("/dashboard");
    } catch (err) {
      setError(`firebase wrong ${err.message}`);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
