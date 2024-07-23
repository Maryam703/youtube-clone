import React, { useEffect, useState } from "react";
import "./TableData.css";
import { collection , getDocs} from "firebase/firestore";
import {db} from "../../Config/FirebaseConfig";


export default function TableData() {
  const headings = ["Video", "Visibility", "Date", "Comment", "Like"];
  const [itemData , setItemData] = useState(null)
  let user = JSON.parse(localStorage.getItem('user'))

  useEffect(()=>{
    const fetchingData = async() => {
      try {
        const docRef = collection(db, "channel", user.uid, "videos");
        const snapShot = await getDocs(docRef)
        let videoArr = [];
        snapShot.forEach((doc)=> videoArr.push({...doc.data(), id:doc.id}))

        setItemData(videoArr)
      } catch (error) {
        console.error(error)
      }
    }
    fetchingData();
  },[])

  return (
    <div className="tbl-container">
      <div className="tbh-h1">Channel Content</div>
      <div className="tbh-h2">Videos</div>

      <table className="table">
        <thead>
          {headings.map((item) => {
            return <th>{item}</th>;
          })}
        </thead>

        <tbody>
          {itemData && itemData.map((item) => {
            return(
              <tr>  
            <td>
              <div className="video-detail-tbl">
                <div className="video-tbl">
                  {item.file && <video className="video-player-tbl" controls>
                    <source src={item.file} />
                  </video>}
                </div>
                <div>{item.titel}</div>
              </div>
            </td>
            <td>{item.visibility}</td>
            <td>{item.date}</td>
            <td>5</td>
            <td>2</td>
          </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}
