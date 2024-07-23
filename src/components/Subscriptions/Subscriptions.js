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
console.log(subscriptions)
    return (
        <div className='subs-container'>
            <div className='subs-container-box'>
                <p>Subscriptions</p>
                {subscriptions.map((item) => {
                    return (
                        <div className='channel-row'>
                            <div className='channel-row-img-container'><img className="channel-row-img" src={item.file} /></div>
                            <div className='channel-row-name' >{item.name}</div>
                        </div>)
                })}</div> </div>
    )
}

export default Subscriptions