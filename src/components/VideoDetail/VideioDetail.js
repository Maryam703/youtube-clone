import React, { useState } from "react";
import "./VideoDetail.css";
import { useParams } from "react-router-dom";
import { mediaJSON } from "../../Api/Api";
import Shorts from "../Shorts/Shorts";

export default function VideioDetail() {
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const videos = mediaJSON.categories[0].videos;
  const video = videos.find((item) => item.id === id);

  return (
    <div className="detail-page">
      <div className="detail-container">
        <div className="deatil-item">
          <div className="detail-video">
            <video controls className="player">
              <source src={video.sources} />
            </video>
          </div>
          <div className="detail-title">
            {video.title.toUpperCase()} | {video.subtitle}
          </div>

<div className="channel-info">
          <div className="channel-ref">
            <div className="channel-img">
              <img className="channel-logo" src="" />
            </div>
            <div>
              <div className="detail-channelname">Channel Name</div>
            </div>
            <div className="channel-subs">Subscribe</div>
          </div>

          <div className="channel-reaction">
            <div className="channel-like"><i class="fa-regular fa-thumbs-up"></i></div>
            <div className="channel-dislike"><i class="fa-regular fa-thumbs-down"></i></div>
          </div>

          
          </div>


          <div className="detail-thumb">{video.thumb}</div>
          <div className="detail-description">{video.description}</div>
        </div>

        <div className="comment-box">
          <div className="do-comment">
            <div className="comment-img-box">
              {" "}
              <img className="comment-img" src="" />
            </div>
            <input
              className="comment-here"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div>
            {comment && (
              <div className="optional-btn">
                <button className="cancel-btn">Cancel</button>
                <button className="comment-btn">Comment</button>
              </div>
            )}
          </div>
          <div className="users-comments">
            <div className="comment-img-box">
              <img className="comment-img" src="" />
            </div>

            <div className="comment-user-box">
              <div className="comment-username">Username</div>
              <div>This is my comment</div>
            </div>
          </div>
        </div>
      </div>

      <div className="short-component">
        <Shorts />
      </div>
    </div>
  );
}
