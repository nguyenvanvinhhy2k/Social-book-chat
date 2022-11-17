import React, {useState, useEffect} from 'react'
import "./friends.css";
import axios from "axios"

export default function Friends({conversation, user}) {
    const [friend, setFriend] = useState(null)
    const FB = "http://localhost:8080/images/"
    const URL_NO_AVATAR = "https://lh3.googleusercontent.com/a/AATXAJynqsD6KNLwZjLPymu65sqANMSqrgLcxu1bPAcJ=s96-c"

    const friendId = conversation.members.find(member => member !== user._id)
    const getFriend = async () => {
       try {
        const res = await axios.get(`/user?userId=${friendId}`);
        setFriend(res.data)
        console.log("a",res.data)
       } catch (error) {
          console.log(error)
       }
    }

    useEffect(() => {
        getFriend()
    },[friendId])

  return (
    <div className="friends">
        <div className="friend-img">
         <img className="rightbarProfileImg-friend" src={friend?.profilePicture ? FB + friend?.profilePicture : URL_NO_AVATAR} alt="" />
         </div>
        <p>{friend?.username}</p>
    </div>
  )
}
