import React, { useEffect, useState } from "react";
import "./UploadDetailModal.css";

export default function UploadDetailModal({ file, closeUploadVideo }) {
  const [titel, setTitel] = useState("");
  const [subtitel, setSubtitel] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    closeUploadVideo();
  }, []);

  return (
    <div className="upload-detail-container">
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
              <div className="uploaded-file">file</div>
            </div>
          </div>
        </div>
        <div className="detail-sec-2">
          <button>Upload</button>
        </div>
      </div>
    </div>
  );
}
