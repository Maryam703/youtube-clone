import React, { useContext, useState } from "react";
import "./Header.css";
import Drawer from "../Drawer/Drawer";
import UserInfo from "../UserInfo/UserInfo";
import { useNavigate } from "react-router-dom";
import UploadVideoModal from "../UploadVideoModal/UploadVideoModal";
import Context from "../../Context/Context";
import { collection, getDocs, where, query, or } from "firebase/firestore";
import { db } from "../../Config/FirebaseConfig";

function Header() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [searchChannel, setSearchChannel] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { setSearch } = useContext(Context)

  const searchYoutube = async () => {
    if (searchChannel !== "") {
      try {
        const q = query(collection(db, "channel"), where("name", ">=", searchChannel), where("name", "<=", searchChannel + "\uf8ff"));
        const channelSnapshot = await getDocs(q);
        let channelArr = [];
        channelSnapshot.forEach((doc) => channelArr.push({ ...doc.data(), id: doc.id }))
        console.log(channelArr)
        setSearch(channelArr)

      } catch (error) {
        console.error(error)
      }
      navigate("/SearchChannel")
    }
  }

  const HandleUser = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const ShowMenu = () => {
    setShowDrawer(true);
  };

  const CloseMenu = () => {
    setShowDrawer(false);
  };

  const HandleUpload = () => {
    navigate("/UserDashboard");
  };
  const CancelUpload = () => {
    setUploadModal(false);
  };
  const HandleUtube = () => {
    navigate("/")
  }

  return (
    <div className="header">
      <div className="header-detail">
        <div className="header-head-side">
          <div onClick={ShowMenu}>
            <i className="icons fa-solid fa-bars"></i>
          </div>
          <img
            src="https://cdn.mos.cms.futurecdn.net/8gzcr6RpGStvZFA2qRt4v6.jpg"
            alt="logo"
            className="logo"
            onClick={HandleUtube}
          />
        </div>
        <div className="header-head-center">
          <input className="search-input" placeholder="Search YouTube" value={searchChannel} onChange={(e) => setSearchChannel(e.target.value)} />
          <div className="search-icon" onClick={searchYoutube}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        {user ? (
          <div className="header-head-side">
            <div className="add-youtube" onClick={HandleUpload}>
              <i className="icons fa-solid fa-video"></i>
            </div>
            <div className="notify-youtube">
              <i class="icons fa-solid fa-bell"></i>
            </div>

            <div className="user-youtube" onClick={HandleUser}>
              <i className="icons fa-regular fa-user"></i>
            </div>
          </div>
        ) : (
          <div className="login-user" onClick={() => navigate("/Login")}>
            {" "}
            <i className="user-icon fa-regular fa-user"></i>Sign
            In
          </div>
        )}
      </div>
      <Drawer showDrawer={showDrawer} CloseMenu={CloseMenu} />
      <UserInfo showModal={showModal} closeModal={closeModal} />
      <UploadVideoModal
        openUploadModal={uploadModal}
        closeUploadVideo={CancelUpload}
      />
    </div>
  );
}

export default Header;
