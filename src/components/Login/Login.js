import React, { useState, useEffect } from "react";
import "./Login.css";
import Loader from "../Loader/Loader";
import { auth, db } from "../../Config/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const [channel, setChannel] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const fetchData = async () => {
      try {
        const docRef = doc(db, "channel", user.uid);
        const channelsnapShot = await getDoc(docRef);

        setChannel(channelsnapShot.data());
      } catch (error) {
        console.error(error)
      }
    }
    if (user) {
      fetchData();
      if (channel) {
        navigate("/")
      } else {
        navigate("/")
      }
    }

  }, [])

  const Handelsubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const users = await signInWithEmailAndPassword(auth, email, password);
      const docRef = doc(db, "users", users.user.uid)
      const querySnapshot = await getDoc(docRef)

      if (!querySnapshot.exists()) {
        navigate("/Register")
      }

      let user = { ...querySnapshot.data(), uid: querySnapshot.id }
      localStorage.setItem("user", JSON.stringify(user))

    } catch (error) {
      console.error(error);
    }
    setEmail("");
    setPassword("");
    setLoading(false)
    navigate("/")
  };

  return (
    <>
      {loading && <Loader />}
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
    </>
  );
}
