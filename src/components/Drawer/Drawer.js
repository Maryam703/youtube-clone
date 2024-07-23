import React from 'react'
import "./Drawer.css"
import { useNavigate } from 'react-router-dom'

export default function Drawer({showDrawer, CloseMenu}) {
  const navigate = useNavigate()

  const HandleHome = () => {
     navigate("/");
     CloseMenu();
  }
  const HandleVideosTable = () => {
    navigate("/TableData");
    CloseMenu();
  }

  const HandelYourChannel = () => {
    navigate("/UserDashboard");
    CloseMenu();
  }
  const HandleSubscription = () => {
    navigate('/Subscriptions')
    CloseMenu();
  }
  
  return (
   <div className={showDrawer? 'drawer-container-active': 'drawer-container'} onClick={CloseMenu} >
        <div className='drawer-logo'>
        
            <img
            src="https://cdn.mos.cms.futurecdn.net/8gzcr6RpGStvZFA2qRt4v6.jpg"
            alt="logo"
            className="drawer-img"
          />
          </div>


        <div className='drawer-sec'>
        <div className='drawer-option' onClick={HandleHome}>
        <i className="drawer-icon fa-solid fa-house"></i>
        <p>Home</p>
        </div>
        <div className='drawer-option'>
        <i className="drawer-icon fa-regular fa-circle-play"></i>
        <p>Shorts</p>
        </div>
        <div className='drawer-option' onClick={HandleSubscription}>
        <i className="drawer-icon fa-brands fa-youtube"></i>
        <p>Subscriptions</p>
        </div>
        </div>

        <div className='drawer-sec' onClick={HandelYourChannel}>
            <div className='drawer-option'>
            <i className="drawer-icon fa-solid fa-tv"></i>
            <p>Your Channel</p>
            </div>   
            <div className='drawer-option' onClick={HandleVideosTable}>
            <i className="drawer-icon fa-solid fa-film"></i>
            <p>Your videos</p>
            </div>      
        </div>

    </div>

  )
}
