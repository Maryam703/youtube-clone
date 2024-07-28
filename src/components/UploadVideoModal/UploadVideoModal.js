import React, { useState } from "react";
import "./UploadVideoModal.css";
import UploadDetailModal from "../UploadDetailModal/UploadDetailModal";


function UploadVideoModal({ openUploadModal, closeUploadVideo }) {
  const [file, setFile] = useState(null);

  const Uploadvideo = () => {
    const input = document.getElementById('fileInput');
    input.click()
  }

  return (
    <>
      <div
        className={
          openUploadModal ? "upload-container-active" : "upload-container"
        }
      >
        <div className="upload-modal-box">
          <div className="upload-modal-box-1">
            <p>Upload Videos</p>
            <i className="fa-solid fa-x" onClick={closeUploadVideo} />
          </div>
          <div className="upload-modal-box-2">
            <div className="upload-modal-box-2-img-box">
              <img
                className="upload-modal-box-2-img"
                src="https://static.vecteezy.com/system/resources/previews/004/640/699/non_2x/circle-upload-icon-button-isolated-on-white-background-vector.jpg"
              />
            </div>
            <p className="upload-modal-box-2-p1">
              Drag and drop video file to upload
            </p>
            <p className="upload-modal-box-2-p2">
              Your videos will be private untill you publish them
            </p>
            <div className="upload-modal-btn" onClick={Uploadvideo}>Upload file</div>
            <input
              id='fileInput' class="hidden"
              type="file"
              accept="video/*"
              placeholder="Upload File"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        </div>
      </div>
      {file && <UploadDetailModal file={file} closeUploadVideo={closeUploadVideo} />}

    </>
  );
}

export default UploadVideoModal;
