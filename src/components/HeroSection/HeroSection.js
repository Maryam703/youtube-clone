import React from "react";
import "./HeroSection.css";
import { mediaJSON } from "../../Api/Api";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const videos = mediaJSON.categories[0].videos;

  return (
    <>
    <div className="container">
        {videos.map((item) =>(
            <>
            <Link to={`VideoDetail/${item.id}`} className="item-container">
              <div className="video-box">
                <video className="video" controls>
                  <source src={item.sources} type="video/mp4" />
                </video>
              </div>
             <div className="video-detail">
                <div className="title">{item.title.toUpperCase()}</div>
                <div className="subtitle">{item.subtitle}</div>
             </div>
              </Link>
            </>
        )
        )};
    </div>
     </>
  );
}
