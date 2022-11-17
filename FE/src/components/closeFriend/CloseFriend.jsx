import "./closeFriend.css";
import { Link } from "react-router-dom"

export default function CloseFriend({user}) {
  const FB = "http://localhost:8080/images/"
  const URL_NO_AVATAR = "https://lh3.googleusercontent.com/a/AATXAJynqsD6KNLwZjLPymu65sqANMSqrgLcxu1bPAcJ=s96-c"
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={user.profilePicture ? FB + user.profilePicture : URL_NO_AVATAR} alt="" />
      <Link to={`/profile/${user.username}`}>
      <span className="sidebarFriendName">{user.username}</span>
      </Link>
    </li>
  );
}
