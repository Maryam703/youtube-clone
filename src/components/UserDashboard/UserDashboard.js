import React, { useState , useEffect} from "react";
import "./UserDashboard.css";
import UploadVideoModal from "../UploadVideoModal/UploadVideoModal";
import {db} from "../../Config/FirebaseConfig"
import { getDoc, doc } from "firebase/firestore";

export default function UserDashboard() {
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [channel, setChannel] = useState(null);
  let user = JSON.parse(localStorage.getItem('user'))
  
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "channel", user.uid);
      const channelData = await getDoc(docRef)

      setChannel(channelData.data());
    }
    fetchData()
  }, [])

  const openUploadVideo = () => {
    setOpenUploadModal(true);
  };
  const closeUploadVideo = () => {
    setOpenUploadModal(false);
  };
 
  return (
    <>
      {" "}
      {channel && (
        <div className="userboard-container">
          <div className="userbox-1">
            <div className="user-img-box">
              <img className="user-image" src={channel.file? channel.file : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbyHZ4yjBXpnnG01YecWfbRFKuukNxlmYE4wRGg5I0jaj6StK0BLJ2SaQ-jcUXT_dAlmo&usqp=CAU'} />
            </div>
            <div className="user-inform">
              <div className="name">{channel.name}</div>
              <div>{channel.email}</div>
              {channel.subscribers && <div>{channel.subscribers.length} Subscriber</div>}
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
