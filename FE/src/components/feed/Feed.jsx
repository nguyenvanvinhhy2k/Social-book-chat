import Post from "../post/Post";
import Share from "../share/Share";
import { useState, useEffect } from "react";
import "./feed.css";
import axios from "axios"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({username}) {
   const [posts,setPosts] = useState([])
   const { user } = useContext(AuthContext);

   useEffect(() => {
    const fetchPosts = async () => {
      const res = username ? await axios.get("/post/profile/" + username) : await axios.get("post/timeline/" + user._id)
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        }))
    }
    fetchPosts()
   },[user._id,username])

  return (
    <div className="feed">
      <div className="feedWrapper">
      <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
