import React, { useState } from "react";
import "./Login.css";
import { auth, db } from "../../Config/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const Handelsubmit = async (e) => {
    e.preventDefault();
    try {
      const users = await signInWithEmailAndPassword(auth, email, password);
      const docRef = doc(db, "users", users.user.uid)
      const querySnapshot = await getDoc(docRef)
      let user = {...querySnapshot.data(),uid:querySnapshot.id}

     localStorage.setItem("user", JSON.stringify(user))
    
      }catch (error) {
      console.error(error);
    }
    setEmail("");
    setPassword("");

    navigate("/")
  };

  return (
    <div className="Login-container">
      <form onSubmit={Handelsubmit}>
        <input
          type="email"
          className="input"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="input"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button">Login</button>
      </form>
    </div>
  );
}
