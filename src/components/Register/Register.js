import React, { useState } from "react";
import "./Register.css";
import Loader from "../Loader/Loader";
import { auth, db } from "../../Config/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const Handelsubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);

      const user = {
        name: name,
        email: email,
        uid: users.user.uid,
        subscriptions:[],
      };

      const docRef = doc(db, "users", users.user.uid);
      await setDoc(docRef, user);

    } catch (error) {
      console.error(error);
    }
    setName("");
    setEmail("");
    setPassword("");
    setLoading(false)
    navigate("/Login")
  };

  return (
    <>
    {loading&& <Loader/> }
    <div className="Login-container">
      <form onSubmit={Handelsubmit}>
        <input
          type="text"
          className="input"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button className="button">Register</button>
      </form>
    </div>
    </>
  );
}
