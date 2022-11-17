import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const [user, setUser] = useState([]);
  const { username } = useParams()
  const FB = "http://localhost:8080/images/"
  const URL_NO_AVATAR = "https://lh3.googleusercontent.com/a/AATXAJynqsD6KNLwZjLPymu65sqANMSqrgLcxu1bPAcJ=s96-c"
  const URL_NO_COVER = "https://raw.githubusercontent.com/safak/youtube/mern-social-app/client/public/assets/person/noCover.png"

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/user?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture ? FB + user.profilePicture : URL_NO_COVER}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture ? FB + user.profilePicture : URL_NO_AVATAR}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar profile={user} />
          </div>
        </div>
      </div>
    </>
  );
}
