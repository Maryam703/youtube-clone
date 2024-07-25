import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserInfo.css"
import CreateChannel from "../../components/CreateChannel/CreateChannel"
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Config/FirebaseConfig";

function UserInfo({ showModal, closeModal }) {
  const [opencreateChannel, setopencreateChannel] = useState(false);
  const [channel, setChannel] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate()


  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "channel", user.uid);
        const channelsnapShot = await getDoc(docRef);
  
        setChannel(channelsnapShot.data());
      } catch (error) {
        console.error(error)
      }
    }
    fetchData();
  }, [])

  const OpenUser = () => {
    navigate("/UserDashboard");
    closeModal();
  }

  const OpencreateModal = () => {
    setopencreateChannel(true);
    closeModal();
  }

  const closecreateModal = () => {
    setopencreateChannel(false)
  }

  const HandleTable = () => {
    navigate("/TableData");
    closeModal();
  }
  const logOut = () => {
    localStorage.removeItem('user');
    navigate("/Login")
  }
  const handleSubscription = () => {
    navigate('/Subscriptions')
    closeModal()
  }

  return (
    <>
     {user && <div className={showModal ? "user-info-container-active" : "user-info-container"} onClick={closeModal}>
       <div className='user-info-logo-sec'>
         <div className='user-info-logo'>
           <img
             src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8QATbxHgFvoPhdxKFIcSQragjLC6BcCo9FiU0koLh0FGzL3FocfsauUs53dAHfKCecaA&usqp=CAU'
             className="user-info-img"
           />
         </div>
         <div className="user-name-email">
           <div className="username-userinfo">{user.name}</div>
           <div>{user.email}</div>
           {channel ? <div className="link-userdashboard" onClick={OpenUser} >View Your Channel</div> : <div className="link-userdashboard" onClick={OpencreateModal} >Create Channel</div>}
         </div>
       </div>


       <div className='user-info-sec'>
         <div className='user-info-option' onClick={handleSubscription}>
           <i className="user-info-icon fa-brands fa-youtube"></i>
           <p>Subscriptions</p>
         </div>
       </div>

       {channel && <div className='user-info-sec'>
         <div className='user-info-option' onClick={HandleTable}>
           <i className="user-info-icon fa-solid fa-film"></i>
           <p>Your videos</p>
         </div>
       </div>}

       <div className='user-info-sec'>
         <div className='user-info-option' onClick={logOut}>
           <i className="user-info-icon fa-solid fa-arrow-right-from-bracket"></i>
           <p>Log out</p>
         </div>
       </div>
     </div>}
     {opencreateChannel && <CreateChannel closecreateModal={closecreateModal} />}
    </>
  );
}

export default UserInfo;
