import React from 'react'
import "./chat.css";
import {format} from "timeago.js"

export default function Chat({message, own}) {
    const URL_NO_AVATAR = "https://lh3.googleusercontent.com/a/AATXAJynqsD6KNLwZjLPymu65sqANMSqrgLcxu1bPAcJ=s96-c"
    const FB = "http://localhost:8080/images/"
  return (
    <>
      <div className={own ? "own" :"chat"}>
        <div className="chat-img">
        <img className="rightbarProfileImg-friend" src={message?.profilePicture ? FB + message?.profilePicture : URL_NO_AVATAR} alt="" />
        </div>
        <div className={own ? "i" :"chat-text"}>
        <p>{message.text}
        </p>
        </div>
      </div>
      <p style={{fontSize: "12px", margin:"0 20px", color: "#ccc"}} className={own ? "own" :"chat"}>{format(message.updatedAt)}</p>
            </>
  )
}
