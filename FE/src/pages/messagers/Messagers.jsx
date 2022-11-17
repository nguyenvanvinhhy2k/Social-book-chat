import React, {useState, useEffect, useRef} from 'react'
import Topbar from '../../components/topbar/Topbar';
import "./messagers.css";
import Friends from '../../components/friends/Friends';
import OnlineChat from '../../components/onlineChat/OnlineChat';
import Chat from '../../components/chat/Chat';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios"
import {io} from "socket.io-client"



export default function Messagers() {
    const { user } = useContext(AuthContext);
    const [friend, setFriend] = useState(null)
    const [curentUser, setCurentUser] = useState(null)
    const [conversation, setConversation] = useState([])
    const [textMessager,setTextMessager] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [messagers, setMessagers] = useState([])
    // const [socket, setSocket] = useState(null)
    const socket = useRef()
    const scrollRef = useRef();
    const FB = "http://localhost:8080/images/"
    const URL_NO_AVATAR = "https://lh3.googleusercontent.com/a/AATXAJynqsD6KNLwZjLPymu65sqANMSqrgLcxu1bPAcJ=s96-c"

    useEffect(() => {
    socket.current = io("ws://localhost:8900")
    socket.current.on("getMessage", data => {
        setArrivalMessage({
            sender:data.senderId,
            text: data.text,
            createdAt: Date.now()
        })
    })
    },[]) 

    useEffect(() => {
        arrivalMessage && curentUser?.members.includes(arrivalMessage.sender) && setMessagers((prev) => [...prev,arrivalMessage])

    },[arrivalMessage, curentUser])

    useEffect(() => {
        socket.current.emit("addUser", user._id)
        socket.current.on("getUser", users => {
            console.log("user", users)  
        })
    },[user])

    useEffect(() => {
        const getMessage = async () => {
            try {
             const res = await axios.get(`/messager/${curentUser?._id}`)
                setMessagers(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getMessage()
    },[curentUser])

    const sendMessager = async (e) => {
        e.preventDefault()
        const messages = {
            conversationId:curentUser._id,
            sender:user._id,
            text:textMessager
        }
        
    const receiverId = curentUser.members.find((member) => member !== user._id)

        socket.current.emit("sendMessage", {
            senderId:user._id,
            receiverId,
            text: textMessager
        })

        try {
          const res = await axios.post("/messager",messages)
          setMessagers([...messagers,res.data])
            setTextMessager("")
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        const getConversation = async () => {
            try {
              const res = await axios.get(`/conversation/${user._id}`)
              setConversation(res.data)
            } catch (error) {
              console.log(error)
            }
          }
      
        getConversation()
    },[user._id])


    const friendId = curentUser?.members.find(member => member !== user._id)

    useEffect(() => {
        const getFriend = async () => {
            try {
             const res = await axios.get(`/user?userId=${friendId}`);
             setFriend(res.data)
            } catch (error) {
               console.log(error)
            }
         }
        getFriend()
    },[])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messagers]);

  return (
    <>
        <Topbar />
        <div className="messagers">
            <div className="messagers-friend">
                <h3>Cuộc trò chuyện</h3>
                {conversation.map((c) => (
                    <div className="" onClick={() => setCurentUser(c)}>
                    <Friends conversation={c} user={user}/>
                    </div>
                ))}
               
            </div>
            <div className="messagers-chat">
               
                {curentUser ?
                 <>
                <div className="friends">
                  <div className="friend-img">
                  <img className="rightbarProfileImg-friend" src={user?.profilePicture ? FB + user?.profilePicture : URL_NO_AVATAR} alt="" />
                </div>
                  <p>{friend?.username}</p>
                </div>
                 <div className="chat-container">
                 {
                    messagers.map(m => (
                        <div className="" ref={scrollRef}>
                        <Chat message={m} own={m.sender === user._id}/>
                        </div>
                    ))
                 }
                </div>
                 <div className="send">
                 <textarea value={textMessager} onChange={(e) => setTextMessager(e.target.value)} placeholder="Nhập tin nhắn của bạn..." className="text-chat" name="" id="" cols="80" rows="5"></textarea>
                 <button onClick={sendMessager}>Send</button>
                 </div> </> 
                 : <p>Hãy chọn cuộc trò chuyện...</p> }
               
            </div>
            <div className="messagers-online">
                <h3>Danh sách online</h3>
                <OnlineChat user={user}/>
                </div>
        </div>
    </>
  )
}
