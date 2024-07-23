import React, { useState, useEffect } from "react";
import "./VideoDetail.css";
import { useParams } from "react-router-dom";
import Shorts from "../Shorts/Shorts";
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../Config/FirebaseConfig";

export default function VideioDetail() {
  const [video, setVideo] = useState({})
  const [channel, setChannel] = useState({})
  const [IsSubscribed, setIsSubscribed] = useState(false)
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);
  const [allComments, setAllComments] = useState(false)
  const { id } = useParams();
  let user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const docRef = doc(db, "channel", user.uid, "videos", id);
        const snapShot = await getDoc(docRef);
        const channelRef = doc(db, "channel", user.uid);
        const channelsnapShot = await getDoc(channelRef);

        const commentRef = collection(db, "channel", user.uid, "videos", id, "comments");
        const commentsnapshot = await getDocs(commentRef);
        let commentArr = [];
        commentsnapshot.forEach((doc) => commentArr.push(doc.data()))

        setVideo(snapShot.data())
        setChannel(channelsnapShot.data())
        setAllComments(commentArr)
      } catch (error) {
        console.error(error)
      }
    }
    fetchingData();
  }, [])

  useEffect(() => {
    const respLike = (video.likes && video.likes.find((item) => item === user.uid)) ? true : false;
    const respdisLike = (video.dislikes && video.dislikes.find((item) => item === user.uid)) ? true : false;
    setIsLiked(respLike);
    setIsDisLiked(respdisLike)
  }, [video])

  const respUser = {
    name: user.name,
    id: user.uid,
  }
  const commentUser = {
    comment: comment,
    name: user.name,
    id: user.uid,
  }

  const doComment = async () => {
    try {
      const docRef = doc(db, "channel", user.uid, "videos", id);
      const collectionRef = collection(docRef, "comments")
      await addDoc(collectionRef, commentUser)
    } catch (error) {
      console.error(error)
    }
    setComment("")
  }

  const checkSubscribe = () => {
    const input = document.getElementById("check-subs");
    input.click();
  }
  const setSubscribe = async(isSubscribe) => {
    setIsSubscribed(isSubscribe);
    try {
      const channelRef = doc(db, "channel", user.uid);
      const userRef = doc(db, "users", user.uid)
      if (isSubscribe) {
        await updateDoc(channelRef, {subscribers: arrayUnion(user.uid)})
        await updateDoc(userRef, {subscriptions: arrayUnion(respUser)})
      } else {
        await updateDoc(channelRef, {subscribers: arrayRemove(user.uid)});
        await updateDoc(userRef, {subscriptions: arrayRemove(respUser)})
      }
    } catch (error) {
      console.error(error)
    }
  }


  const Checklike = () => {
    const input = document.getElementById('like');
    input.click()
  }
  const setLike = async (isLiked) => {
    setIsLiked(isLiked)
    try {
      const docRef = doc(db, "channel", user.uid, "videos", id);
      if(isLiked){
        await updateDoc(docRef, { likes: arrayUnion(user.uid),dislikes: arrayRemove(user.uid) })
      }else{
        await updateDoc(docRef, { likes: arrayRemove(user.uid) })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const Checkdislike = () => {
    const input = document.getElementById('dislike');
    input.click()
  }
  const setDisLike = async(isDisLiked) => {
    setIsDisLiked(isDisLiked);
    try {
      const docRef = doc(db, "channel", user.uid, "videos", id);
      if (isDisLiked) {
        await updateDoc(docRef,{dislikes: arrayUnion(user.uid),likes: arrayRemove(user.uid)})
      } else {
        await updateDoc(docRef,{dislikes: arrayRemove(user.uid)})
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="detail-page">
      <div className="detail-container">
        <div className="deatil-item">
          <div className="detail-video">
            {video.file && <video controls className="player">
              <source src={video.file} />
            </video>
            }
          </div>
          {video && <div className="detail-title">
            {video.titel} | {video.subtitel}
          </div>}

          <div className="channel-info">
            <div className="channel-ref">
              {channel && <div className="channel-img">
                <img className="channel-logo" src={channel.file} />
              </div>}
              <div>
                {channel && <div className="detail-channelname">{channel.name}</div>}
              </div >
              <div onClick={checkSubscribe}>
              {IsSubscribed ? <div className="channel-subs">Subscribed ✓</div> : <div className="channel-subs">Subscribe</div>}
              </div>
              <input type="checkbox" class="hidden" id="check-subs" value={IsSubscribed} onChange={(e) => setSubscribe(e.target.checked)} />
            </div>

            <div className="channel-reaction" onClick={Checklike}>
              <div className="channel-like">
                {isLiked ? <i class="fa-solid fa-thumbs-up" ></i> : <i class="fa-regular fa-thumbs-up" ></i>}
              </div>
              <input class='hidden' id="like" type="checkbox" value={isLiked} onChange={(e) => setLike(e.target.checked)} />
              <div className="channel-dislike" onClick={Checkdislike}>
                {isDisLiked ? <i class="fa-solid fa-thumbs-down" ></i> : <i class="fa-regular fa-thumbs-down" ></i>}
              </div>
              <input class='hidden' id="dislike" type="checkbox" value={isDisLiked} onChange={(e) => setDisLike(e.target.checked)} />
            </div>


          </div>


          <div className="detail-thumb">{video.thumb}</div>
          <div className="detail-description">{video.description}</div>
        </div>

        <div className="comment-box">
          <div className="do-comment">
            <div className="comment-img-box">
              {" "}
              <img className="comment-img" src={channel.file} />
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
                <button className="comment-btn" onClick={doComment}>Comment</button>
              </div>
            )}
          </div>
          {allComments && allComments.map((item) => <div className="users-comments">
            <div className="comment-img-box">
              <img className="comment-img" src="" />
            </div>

            <div className="comment-user-box">
              <div className="comment-username">{item.name}</div>
              <div>{item.comment}</div>
            </div>
          </div>)}
        </div>
      </div>

      <div className="short-component">
        <Shorts />
      </div>
    </div>
  );
}
