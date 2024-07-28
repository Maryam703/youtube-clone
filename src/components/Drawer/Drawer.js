import React, { useEffect, useState } from 'react'
import "./Drawer.css"
import { useNavigate } from 'react-router-dom'
import { db } from "../../Config/FirebaseConfig"
import { doc, getDoc } from "firebase/firestore"

export default function Drawer({ showDrawer, CloseMenu }) {
  const [channel, setChannel] = useState({})
  let user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  useEffect(() => {
    const fetchindata = async () => {
      try {
        const channelRef = doc(db, "channel", user.uid);
        const channelSnapshot = await getDoc(channelRef);
        setChannel(channelSnapshot.data())
      } catch (error) {
        console.error(error)
      }
    }
    fetchindata()
  }, [])

  const HandleHome = () => {
    navigate("/");
    CloseMenu();
  }
  const HandelYourChannel = () => {
    if (channel) {
      navigate("/UserDashboard");
      CloseMenu();
    } else {
      navigate("/CreateChannel")
      CloseMenu();
    }
  }
  const HandleSubscription = () => {
    navigate('/Subscriptions')
    CloseMenu();
  }
  const HandleVideosTable = () => {
    navigate('/TableData')
    CloseMenu();
  }

  return (
    <div className={showDrawer ? 'drawer-container-active' : 'drawer-container'} onClick={CloseMenu} >
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
        <div className='drawer-option' onClick={HandleSubscription}>
          <i className="drawer-icon fa-brands fa-youtube"></i>
          <p>Subscriptions</p>
        </div>
      </div>

      <div className='drawer-sec'>
        <div className='drawer-option' onClick={HandelYourChannel}>
          <i className="drawer-icon fa-solid fa-tv"></i>
          <p>Your Channel</p>
        </div>
        {channel && <div className='drawer-option' onClick={HandleVideosTable}>
          <i className="drawer-icon fa-solid fa-film"></i>
          <p>Your videos</p>
        </div>}
      </div>

    </div>

  )
}
