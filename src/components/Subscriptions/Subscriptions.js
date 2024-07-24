import React, { useEffect, useState } from 'react'
import "./Subscriptions.css"
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../../Config/FirebaseConfig'

function Subscriptions() {
    const [subscriptions, setSubscriptions] = useState([])
    let user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        try {
            const fetchingData = async () => {
                const docRef = doc(db, "users", user.uid);
                const snapShot = await getDoc(docRef);
                setSubscriptions(snapShot.data().subscriptions)

            }
            fetchingData()
        } catch (error) {
            console.error(error)
        }
    }, [])

    return (
        <div className='subs-container'>
            <div className='subs-container-box'>
                <p>Subscriptions</p>
                {subscriptions.map((item) => {
                    return (
                        <div className='channel-row'>
                            <div className='channel-row-img-container'><img className="channel-row-img"
                                src={item.file ? item.file : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbyHZ4yjBXpnnG01YecWfbRFKuukNxlmYE4wRGg5I0jaj6StK0BLJ2SaQ-jcUXT_dAlmo&usqp=CAU"} /></div>
                            <div className='channel-row-name' >{item.name}</div>
                        </div>)
                })}</div> </div>
    )
}

export default Subscriptions