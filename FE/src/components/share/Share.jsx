import "./share.css";
import {PermMedia, Label,Room, EmojiEmotions} from "@material-ui/icons"
import { useContext, useRef, useState} from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios"

export default function Share() {
  const { user } = useContext(AuthContext);
  const desc = useRef()
  const [file, setFile] = useState(null)
  const FB = "http://localhost:8080/images/"
  const URL_NO_AVATAR = "https://lh3.googleusercontent.com/a/AATXAJynqsD6KNLwZjLPymu65sqANMSqrgLcxu1bPAcJ=s96-c"

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newPost = {
      userId:user._id,
      desc: desc.current.value,
    }
    if(file){
      const data = new FormData()
      const fileName = file.name
      data.append("file",file)
      data.append("name",fileName)
      newPost.img = fileName
      try {
       await axios.post("/upload", data)
      } catch (error) {
        console.log(error)
      }
    }
    try {
       await axios.post("/post",newPost)
       window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user.profilePicture ? FB + user.profilePicture : URL_NO_AVATAR } alt="" />
          <input
            placeholder={`What's in your mind ${user.username}?`}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr"/>
        {file && (
          <div className="shareContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <div className="shareX" onClick={() => setFile(null)}>X</div>
          </div>
        )}
        <form className="shareBottom" onSubmit={handleSubmit}>
            <div className="shareOptions">
                <label htmlFor="file" className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Photo or Video</span>
                    <input style={{display: 'none'}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=> setFile(e.target.files[0])} />
                </label>
                <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <button type="submit" className="shareButton">Share</button>
        </form>
      </div>
    </div>
  );
}
