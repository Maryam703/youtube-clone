import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserInfo.css"

function UserInfo({showModal, closeModal}) {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate()

  const OpenUser = () => {
    navigate("/UserDashboard");
    closeModal();
  }

  const HandleTable = () => {
    navigate("/TableData");
    closeModal();
  }
  return (
    <>
    {user && <div className={showModal?  "user-info-container-active" : "user-info-container"} onClick={closeModal}>
      <div className='user-info-logo-sec'>
       <div className='user-info-logo'>
        <img
        src=""
        className="user-info-img"
      />
      </div>
      <div className="user-name-email">
      <div className="username-userinfo">{user.name}</div>
      <div>{user.email}</div>
      <div className="link-userdashboard" onClick={OpenUser} >View Your Channel</div>
      </div>
      </div>


    <div className='user-info-sec'>
    <div className='user-info-option'>
    <i className="user-info-icon fa-brands fa-youtube"></i>
    <p>Subscriptions</p>
    </div>
    </div>

    <div className='user-info-sec'>
          
        <div className='user-info-option' onClick={HandleTable}>
        <i className="user-info-icon fa-solid fa-film"></i>
        <p>Your videos</p>
        </div>  
        <div className='user-info-option'>
        <i class="user-info-icon fa-solid fa-gear"></i>
        <p>Setting</p>
        </div>       
    </div>

    <div className='user-info-sec'>
    <div className='user-info-option '>
        <i className="user-info-icon fa-regular fa-circle-question"></i>
        <p>Help</p>
        </div> 
        <div className='user-info-option'>
        <i className="user-info-icon fa-regular fa-message"></i>
        <p>Send Feedback</p>
        </div>      
    </div>
    </div>}
    </>
  );
}

export default UserInfo;
