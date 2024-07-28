import React, { useEffect , useState} from "react";
import "./HeroSection.css";
import { Link } from "react-router-dom";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../../Config/FirebaseConfig";

export default function HeroSection() {
  const [videos , setVideos] = useState(null)
  let user = JSON.parse(localStorage.getItem('user'));

  useEffect(()=>{
    const fetchingData = async() => {
      try {
        const userRef = doc(db, "users", user.uid);
        const querySnapshot = await getDoc(userRef);
        const subscriptions = querySnapshot.data().subscriptions;
        const subscriptionsIds = subscriptions.map((item)=> item.id);

        const queries = await Promise.all(subscriptionsIds.map(id=>{
          return getDocs(collection(db,"channel",id,"videos"))
        }))

        const videos = []
        queries.forEach(docs=>{
          docs.forEach(video=>{
            videos.push( {id:video.id,...video.data()})
          })
        })

        setVideos(videos)
      } catch (error) {
        console.error(error)
      }
    }
    fetchingData();
  },[])

  return (
    <>
    <div className="container">
        {videos && videos.map((item) =>(
            <>
            <Link to={`VideoDetail/${item.id}`} className="item-container">
              <div className="video-box">
                {item.file && <video className="video" controls>
                  <source src={item.file} type="video/mp4" />
                </video>}
              </div>
             <div className="video-details">
                <div className="title">{item.titel.toUpperCase()}</div>
                <div className="subtitle">{item.subtitel}</div>
             </div>
              </Link>
            </>
        )
        )}
    </div>
     </>
  );
}
