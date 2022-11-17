import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useState, useEffect, useContext } from "react";
import { format } from "timeago.js";
import axios from "axios"
import {Link} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [user, setUser] = useState({})
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const { user: currentUser } = useContext(AuthContext);
  const FB = "http://localhost:8080/images/"
  const URL_NO_AVATAR = "https://lh3.googleusercontent.com/a/AATXAJynqsD6KNLwZjLPymu65sqANMSqrgLcxu1bPAcJ=s96-c"
  const URL_NO_COVER = "https://raw.githubusercontent.com/safak/youtube/mern-social-app/client/public/assets/person/noCover.png"

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() =>{
    const fetchUser = async () => {
      const res = await axios.get(`/user?userId=${post.userId}`);
      setUser(res.data);
    }
    fetchUser()
  },[post.userId])

  const likeHandler = () => {
    try {
      axios.put("/post/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {
      console.log(err)
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
 
  return (
    <div className="post">
      <div className="postWrapper" style={{padding:"20px"}}>
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={post.profilePicture ? FB + post.profilePicture : URL_NO_AVATAR}
              alt=""
            />  
            <Link  to={`/profile/${user.username}`}>
            <span className="postUsername">
              {user.username}
            </span>
            </Link>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.img ? FB + post.img : URL_NO_COVER} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className={isLiked ? "dislike": "likeIcon"}  src={ FB + "like.png" } alt="" onClick={likeHandler}/>
            {/* <img className="dislike" src={`${FB}/like.png`}  alt="" onClick={likeHandler}/> */}
            <span className="postLikeCounter">{like}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
