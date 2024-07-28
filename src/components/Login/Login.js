import React, { useState, useEffect } from "react";
import "./Login.css";
import Loader from "../Loader/Loader";
import { auth, db } from "../../Config/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

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

      let user = { ...querySnapshot.data(), uid: querySnapshot.id }
      localStorage.setItem("user", JSON.stringify(user))

      setEmail("");
      setPassword("");
      setLoading(false)
      navigate("/")

    } catch (error) {
      navigate("/Register")
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="Login-container">
        <div className="login-logo"><img className="login-logo-img" src="https://static-00.iconduck.com/assets.00/youtube-icon-1024x1024-t3zo1lo4.png" /></div>
        <form onSubmit={Handelsubmit}>
          <input
            type="email"
            required
            className="input"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            className="input"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button">Login</button>
          <div>Don't have an account?<Link className="reg-link" to={"/Register"}>Register here!</Link></div>
        </form>
      </div>
    </>
  );
}
