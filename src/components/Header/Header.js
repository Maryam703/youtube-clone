import React, { useState } from "react";
import "./Header.css";
import Drawer from "../Drawer/Drawer";
import UserInfo from "../UserInfo/UserInfo";
import { useNavigate } from "react-router-dom";
import UploadVideoModal from "../UploadVideoModal/UploadVideoModal";

function Header() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

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
    setUploadModal(true);
  };
  const CancelUpload = () => {
    setUploadModal(false);
  };

  return (
    <div className="header">
      <div className="header-detail">
        <div className="header-heads">
          <div onClick={ShowMenu}>
            <i className="icons fa-solid fa-bars"></i>
          </div>
          <img
            src="https://cdn.mos.cms.futurecdn.net/8gzcr6RpGStvZFA2qRt4v6.jpg"
            alt="logo"
            className="logo"
          />
        </div>
        <div className="header-heads">
          <input className="search-input" placeholder="Search YouTube" />
          <div className="search-icon">
            <i className="icons fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        {user ? (
          <div className="header-heads">
            <div className="add-youtube" onClick={HandleUpload}>
              <i className="icons fa-solid fa-video"></i>
            </div>
            <div className="notify-youtube">
              <i class="icons fa-solid fa-bell"></i>
            </div>

            <div onClick={HandleUser}>
              <i id="youtube-user" className="icons fa-regular fa-user"></i>
            </div>
          </div>
        ) : (
          <div className="login-user" onClick={() => navigate("/Login")}>
            {" "}
            <i id="youtube-user" className="icons fa-regular fa-user"></i>Sign
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
