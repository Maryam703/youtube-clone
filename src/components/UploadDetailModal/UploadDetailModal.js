import React, { useState } from "react";
import "./UploadDetailModal.css";
import Loader from "../Loader/Loader"
import {db, storage} from "../../Config/FirebaseConfig";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function UploadDetailModal({ file, closeUploadVideo }) {
  const [titel, setTitel] = useState("");
  const [subtitel, setSubtitel] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [detailModal, setdetailModal] = useState(true)
  let user = JSON.parse(localStorage.getItem('user'))
  const date = new Date(Date.now()).toLocaleString();


  const videoData = {
    titel: titel,
    subtitel: subtitel,
    description: description,
    date: date,
    visibility: "public",
    likes:[],
    dislikes: [],
  }

  const UploadVideo = async() => {
    setLoading(true)
    try {
      const date = Date.now()
    const fileRef =  ref(storage, date.toString());

    await uploadBytes(fileRef, file);

    const url = await getDownloadURL(fileRef);

    const docRef = collection(db, "channel",user.uid, "videos");
    await addDoc(docRef, {...videoData, file: url})
    } catch (error) {
      console.error(error)
    }

    setdetailModal(false)
    closeUploadVideo()
    setLoading(false)
    navigate("/TableData")
  }

  return (
    <>
    {loading && <Loader />}
    <div className= {detailModal? "upload-detail-container-active" : "upload-detail-container"}>
      <div className="upload-detail-box">
        <div>
          <p className="upload-para">Details</p>
          <div className="detail-upload">
            <div className="detail-upload-1">
              <div className="video-detail">
                Titel:
                <input
                  className="inputs"
                  type="text"
                  value={titel}
                  placeholder="Titel of the Video"
                  onChange={(e) => setTitel(e.target.value)}
                />
              </div>
              <div className="video-detail">
                Subtitel:
                <input
                  className="inputs"
                  type="text"
                  value={subtitel}
                  placeholder="Subtitel"
                  onChange={(e) => setSubtitel(e.target.value)}
                />
              </div>
              <div className="video-detail">
                Description:
                <textarea
                  className="large-input"
                  rows="7"
                  cols="40"
                  type="text"
                  value={description}
                  placeholder="Tell viewers about your video"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="detail-upload-2">
              <div className="uploaded-file"><video width="100%" height="100%" controls><source src={file}/></video></div>
            </div>
          </div>
        </div>
        <div className="detail-sec-2" onClick={UploadVideo}>
          <button>Upload</button>
        </div>
      </div>
    </div>
    </>
  );
}
