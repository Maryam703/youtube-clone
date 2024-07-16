import React, { useState } from "react";
import "./UserDashboard.css";
import UploadVideoModal from "../UploadVideoModal/UploadVideoModal";

export default function UserDashboard() {
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const openUploadVideo = () => {
    setOpenUploadModal(true);
  };
  const closeUploadVideo = () => {
    setOpenUploadModal(false);
  };

  return (
    <>
      {" "}
      {user && (
        <div className="userboard-container">
          <div className="userbox-1">
            <div className="user-img-box">
              <img className="user-image" src="" />
            </div>
            <div className="user-inform">
              <div className="name">{user.name}</div>
              <div>{user.email}</div>
              <div>2 Subscriber</div>
              <div>More About this channel</div>
            </div>
          </div>

          <div className="userbox-2">
            <div className="logo-img-container">
              <img
                className="logo-img"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsr_A7MsHP8B3zI7Bo4phX32myPwyQWV6CZ1vmGca5pcWOQ4ouwrYLdN16JigWAqsBAC8&usqp=CAU"
              />
            </div>

            <div className="msg-1">Create Content on Any Device</div>
            <div>Upload and record at home or on the go</div>
            <div>EveryThing that you make public will appear here</div>
            <button className="create-btn" onClick={openUploadVideo}>
              Create
            </button>
          </div>
          <UploadVideoModal
            openUploadModal={openUploadModal}
            closeUploadVideo={closeUploadVideo}
          />
        </div>
      )}
    </>
  );
}
