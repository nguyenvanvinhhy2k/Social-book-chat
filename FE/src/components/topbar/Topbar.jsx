import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { useHistory, Link } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const history = useHistory()
  const FB = "http://localhost:8080/images/"
  const URL_NO_AVATAR = "https://lh3.googleusercontent.com/a/AATXAJynqsD6KNLwZjLPymu65sqANMSqrgLcxu1bPAcJ=s96-c"
  console.log(user)
    const logOut = () => {
      localStorage.removeItem("user")
      history.push("/login")
    }
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/">
        <span className="logo">Socialbook</span>
        </Link>
     
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
          <Link to="/messager">
            <Chat />
          </Link>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
        <img src={user.profilePicture ? FB + user.profilePicture : URL_NO_AVATAR} alt="" className="topbarImg"/>
        </Link>
      </div>
    </div>
  );
}
