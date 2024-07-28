import React, { useState, useEffect } from 'react'
import "./Search.css"
import { doc, arrayUnion, arrayRemove, updateDoc, getDoc } from 'firebase/firestore'
import { db } from '../../Config/FirebaseConfig'

export default function SearchCHannelCard({ id, file, name, email, subscribers }) {
  const [isSubscribed, setIsSubscribed] = useState(false)
  let user = JSON.parse(localStorage.getItem("user"))
  console.log(id)

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const docRef = doc(db, "users", user.uid)
        const querySnapshot = await getDoc(docRef)
        let userSubs = querySnapshot.data();
        const respSubscriptions = (userSubs.subscriptions.find((item) => item.id === id)) ? true : false;

        setIsSubscribed(respSubscriptions)
      } catch (error) {
        console.error(error)
      }
    }
    fetchingData()
  }, [])

  const channel = {
    id: id,
    name: name,
    file: file ? file : "",
  }

  const checkSubscribe = () => {
    const input = document.getElementById(`check-subs-${id}`);
    input.click();
  }
  const setSubscribe = async (isSubscribe) => {
    setIsSubscribed(isSubscribe);
    try {
      const userRef = doc(db, "users", user.uid)
      const channelRef = doc(db, "channel", id)
      if (isSubscribe) {
        await updateDoc(userRef, { subscriptions: arrayUnion(channel) });
        await updateDoc(channelRef, { subscribers: arrayUnion(user.uid) });
      } else {
        await updateDoc(userRef, { subscriptions: arrayRemove(channel) });
        await updateDoc(channelRef, { subscribers: arrayRemove(user.uid) });
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='searched-container' key={id}>
      <div className='searched-container-box'>
        <div className='searched-container-box1'>
          <div className='searched-container-box1-imgbox'>
            <img src={file ? file : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSobTY7Q2sehhBnC63J3JmYI6SU85T17wK670NkBVWo9dOdFo7tbxYntTB9ZnfhW-RY7LQ&usqp=CAU"} />
          </div>
        </div>
        <div className='searched-container-box2'>
          <div className='searched-detail'><div className='searched-container-box2-title'>{name}</div>
            <div className='searched-container-box2-email'>{email}  • {subscribers.length} Subscribers</div></div>
          <div className='searched-subscribe' onClick={checkSubscribe}>
            {isSubscribed ? <div className='searched-subscribe-btn'>Subscribed ✓</div> : <div className="searched-subscribe-btn">Subscribe</div>}
          </div>
          <input type="checkbox" class="hidden" id={`check-subs-${id}`} value={isSubscribed} onChange={(e) => setSubscribe(e.target.checked)} />
        </div>
      </div>
    </div>
  )
}
