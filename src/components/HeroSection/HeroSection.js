import React, { useEffect , useState} from "react";
import "./HeroSection.css";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Config/FirebaseConfig";

export default function HeroSection() {
  const [videos , setVideos] = useState(null)
  let user = JSON.parse(localStorage.getItem('user'));

  useEffect(()=>{
    const fetchingData = async() => {
      try {
        const docRef = collection(db, "channel", user.uid, "videos");
        const snapShot = await getDocs(docRef)
        let videoArr = [];
        snapShot.forEach((doc)=> videoArr.push({...doc.data(), id:doc.id}))

        const filteredArr = videoArr.filter((item)=> item.visibility === "public")
        setVideos(filteredArr)
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
             <div className="video-detail">
                <div className="title">{item.titel.toUpperCase()}</div>
                <div className="subtitle">{item.subtitel}</div>
             </div>
              </Link>
            </>
        )
        )};
    </div>
     </>
  );
}
