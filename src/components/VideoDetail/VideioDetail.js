import React, { useState, useEffect, useContext } from "react";
import "./VideoDetail.css";
import Loader from "../Loader/Loader"
import { useParams } from "react-router-dom";
import Shorts from "../Shorts/Shorts";
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../Config/FirebaseConfig";

export default function VideioDetail() {
  const [loading, setLoading] = useState(false)
  const [channel, setChannel] = useState({})
  const [userChannel, setUserChannel] = useState({})
  const [video, setVideo] = useState({})
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);
  const [allComments, setAllComments] = useState(false)
  const { id } = useParams();
  let user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    setLoading(true)
    const fetchingData = async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        const querySnapshot = await getDoc(userRef);
        const subscriptions = querySnapshot.data().subscriptions;
        const subscriptionsIds = subscriptions.map((item) => item.id);

        const queries = await Promise.all(subscriptionsIds.map(id => {
          return getDocs(collection(db, "channel", id, "videos"))
        }))
        const videos = []
        queries.forEach(docs => {
          docs.forEach(video => {
            videos.push({ id: video.id, ...video.data() })
          })
        })
        const relVideo = videos.find((item) => item.id === id)
        setVideo(relVideo)
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
    }
    fetchingData();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = collection(db, "channel")
        const snapShot = await getDocs(docRef)
        const channelArr = [];
        snapShot.forEach((doc) => channelArr.push({ ...doc.data(), id: doc.id }))
        const channelName = channelArr.find((item) => item.id === video.channelId)

        setChannel(channelName)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [video])

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const commentRef = collection(db, "channel", channel.id, "videos", id, "comments");
        const commentsnapshot = await getDocs(commentRef);
        let commentArr = [];
        commentsnapshot.forEach((doc) => commentArr.push({ ...doc.data(), id: doc.id }))

        setAllComments(commentArr)
      } catch (error) {
        console.error(error)
      }
    }
    fetchingData();
  }, [comment, channel])


  useEffect(() => {
    const fetchingData = async () => {
      try {
        const respLike = (video.likes && video.likes.find((id) => id === user.uid)) ? true : false;
        const respdisLike = (video.dislikes && video.dislikes.find((id) => id === user.uid)) ? true : false;

        const docRef = doc(db, "users", user.uid)
        const querySnapshot = await getDoc(docRef)
        let userSubs = querySnapshot.data();
        const respSubscriptions = (userSubs.subscriptions.length > 0 && userSubs.subscriptions.find((item) => item.id === channel.id)) ? true : false;

        setIsLiked(respLike);
        setIsDisLiked(respdisLike);
        setIsSubscribed(respSubscriptions)
      } catch (error) {
        console.error(error)
      }
    }
    fetchingData()
  }, [video, channel])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "channel", user.uid)
        const snapShot = await getDoc(docRef)
        setUserChannel({ ...snapShot.data(), id: snapShot.id })
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const commentbyUser = {
    comment: comment,
    name: user.name,
    id: user.uid,
  }
  const commentbyChannel = {
    comment: comment,
    name: userChannel.name,
    id: user.uid,
    file: userChannel.file ? userChannel.file : "",
  }
  const doComment = async () => {
    try {
      const docRef = collection(db, "channel", channel.id, "videos", id, "comments");
      const commentUser = channel ? commentbyChannel : commentbyUser;

      await addDoc(docRef, commentUser)
    } catch (error) {
      console.error(error)
    }
    setComment("")
  }

  const CancelComment = () => {
    setComment("")
  }

  const respUser = {
    name: channel && channel.name,
    id: channel && channel.id,
    file: channel ? channel.file : ""
  }
  const checkSubscribe = () => {
    const input = document.getElementById("check-subs");
    input.click();
  }
  const setSubscribe = async (isSubscribe) => {
    setIsSubscribed(isSubscribe);
    try {
      const channelRef = doc(db, "channel", channel.id);
      const userRef = doc(db, "users", user.uid)
      if (isSubscribe) {
        await updateDoc(channelRef, { subscribers: arrayUnion(user.uid) })
        await updateDoc(userRef, { subscriptions: arrayUnion(respUser) })
      } else {
        await updateDoc(channelRef, { subscribers: arrayRemove(user.uid) });
        await updateDoc(userRef, { subscriptions: arrayRemove(respUser) })
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
      const docRef = doc(db, "channel", channel.id, "videos", id);
      if (isLiked) {
        await updateDoc(docRef, { likes: arrayUnion(user.uid), dislikes: arrayRemove(user.uid) })
      } else {
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
  const setDisLike = async (isDisLiked) => {
    setIsDisLiked(isDisLiked);
    try {
      const docRef = doc(db, "channel", channel.id, "videos", id);
      if (isDisLiked) {
        await updateDoc(docRef, { dislikes: arrayUnion(user.uid), likes: arrayRemove(user.uid) })
      } else {
        await updateDoc(docRef, { dislikes: arrayRemove(user.uid) })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {loading && <Loader />}
      <div className="detail-page">
        <div className="detail-container">
          <div className="deatil-item">
            <div className="detail-video">
              {video.file && <video controls className="player">
                <source src={video.file} type="video/mp4" />
              </video>
              }
            </div>
            {video && <div className="detail-title">
              {video.titel} | {video.subtitel}
            </div>}

            <div className="channel-info">
              <div className="channel-ref">
                {channel && <div className="channel-img">
                  <img className="channel-logo" src={channel.file ? channel.file : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8QATbxHgFvoPhdxKFIcSQragjLC6BcCo9FiU0koLh0FGzL3FocfsauUs53dAHfKCecaA&usqp=CAU"} />
                </div>}
                <div>
                  {channel && <div className="detail-channelname">{channel.name}</div>}
                </div >
                <div onClick={checkSubscribe}>
                  {isSubscribed ? <div className="channel-subs">Subscribed ✓</div> : <div className="channel-subs">Subscribe</div>}
                </div>
                <input type="checkbox" class="hidden" id="check-subs" value={isSubscribed} onChange={(e) => setSubscribe(e.target.checked)} />
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
            <div className="detail-description">{video.description}</div>
          </div>

          <div className="comment-box">
            <div className="do-comment">
              <div className="comment-img-box">
                {" "}
                <img className="comment-img" src={userChannel.file ? userChannel.file : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8QATbxHgFvoPhdxKFIcSQragjLC6BcCo9FiU0koLh0FGzL3FocfsauUs53dAHfKCecaA&usqp=CAU"} />
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
                  <button className="cancel-btn" onClick={CancelComment}>Cancel</button>
                  <button className="comment-btn" onClick={doComment}>Comment</button>
                </div>
              )}
            </div>
            {allComments && allComments.map((item) => <div className="users-comments">
              <div className="comment-img-box">
                <img className="comment-img" src={item.file ? item.file : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8QATbxHgFvoPhdxKFIcSQragjLC6BcCo9FiU0koLh0FGzL3FocfsauUs53dAHfKCecaA&usqp=CAU"} />
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
    </>
  );
}
