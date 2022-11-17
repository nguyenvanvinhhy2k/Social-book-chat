import "./online.css";
import { Link } from "react-router-dom"

export default function Online({user}) {
  const FB = "http://localhost:8080/images/"
  const URL_NO_AVATAR = "https://lh3.googleusercontent.com/a/AATXAJynqsD6KNLwZjLPymu65sqANMSqrgLcxu1bPAcJ=s96-c"
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" src={user.profilePicture ? FB + user.profilePicture : URL_NO_AVATAR} alt="" />
        <span className="rightbarOnline"></span>
      </div>
      <Link to={`/profile/${user.username}`} >
      <span className="rightbarUsername">{user.username}</span>
      </Link>
    </li>
  );
}
