import "./rightbar.css";
import Online from "../online/Online";
import { useState, useEffect } from "react"
import axios from "axios"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom"

export default function Rightbar({profile}) {
  const FB = "http://localhost:8080/images/"
  const [friends, setFriends] = useState([])
  const [friendss, setFriendss] = useState([])
  const {user:userId} = useContext(AuthContext);
  const URL_NO_AVATAR = "https://lh3.googleusercontent.com/a/AATXAJynqsD6KNLwZjLPymu65sqANMSqrgLcxu1bPAcJ=s96-c"

  useEffect(() => {
    const fetchFriends = async () => {
      const res = await axios.get(`/user/friends/${userId?._id}`)
      setFriendss(res.data)
      console.log("aaa",friends)
    }
    fetchFriends()
  },[userId])
  
  useEffect(() => {
    const fetchFriends = async () => {
      const res = await axios.get(`/user/friends/${profile?._id}`)
      setFriends(res.data)
      console.log("aaa",friends)
    }
    fetchFriends()
  },[profile])
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={`${FB}/gift.png`} alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src={`${FB}/ad.png`} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {friendss.map((u) => (
            <Online key={u._id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
       <button className="rightbarFollowButton">
        Follow
          </button>
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{profile.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{profile.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{profile.relationship >= 1 ? "Football": "Thất nghiệp"}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
        {friends.map((friend) => (
          <Link to={`/profile/${friend.username}`} >
              <div className="rightbarFollowing">
                <img
                  src={ friend.profilePicture ? FB + friend.profilePicture: URL_NO_AVATAR}
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
              </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
