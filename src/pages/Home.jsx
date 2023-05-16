import React, { useEffect, useState } from 'react'
import Person1 from '../assets/Person1.png'
import Menu from '../assets/Menu.svg'
import PrivateChat from '../components/PrivateChat'
import BubbleChat from '../components/BubbleChat/BubbleChat'
import Button from '../components/Button/Button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { io } from 'socket.io-client'

const Home = () => {
  const navigate = useNavigate()
  const [socket, setSocket] = useState()
  const [profile, setProfile] = useState(false)
  const [id, setId] = useState("")
  const [roomId, setRoomId] = useState("")
  const [token, setToken] = useState("")
  const [profilePhoto, setProfilePhoto] = useState("")
  const [trigger, setTrigger] = useState(false)
  const [message, setMessage] = useState("")
  const [listMessage, setListMessage] = useState([])
  const [conversations, setConversations] = useState([])
  const [editForm, setEditForm] = useState(
    {
      name: "",
      email: "",
      phone: ""
    }
  )
  const handleMessageChange = (event) => {
    setMessage(event.target.value)
  }
  const handleMessage = (event) => {
    event.preventDefault()
    if (message) {
      socket.emit("sendMessage", {
        message,
        sender_id: id,
        room_id: roomId
      })
      setMessage("")
    }
  }
  const handleProfileSwitch = () => {
    setProfile(!profile)
  }
  const handleEdit = (event) => {
    event.preventDefault()
    const formData = new FormData();
    for (const property in editForm) {
      if (!editForm[property]) {
        Swal.fire({
          title: `Edit Failed`,
          text: `Please fill every text form`,
          icon: 'error',
        });
        return
      }
      formData.append(property, editForm[property])
    }
    axios.put(`${process.env.REACT_APP_BACKEND}/users/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        Swal.fire({
          title: `Edit Success`,
          text: `${res.data.message}`,
          icon: 'success',
        });
      })
      .catch((err) => {
        Swal.fire({
          title: `Edit Failed`,
          text: `${err.response.data.message}`,
          icon: 'error',
        });
        setTrigger(!trigger)
      })

  }
  const handleEditChange = (event) => {
    setEditForm({
      ...editForm,
      [event.target.id]: event.target.value
    })
  }
  const handleEditPhotoChange = (event) => {
    setEditForm({
      ...editForm,
      [event.target.name]: event.target.files[0]
    })
  }
  // Use Effect
  useEffect(() => {
    const tempId = localStorage.getItem("id")
    axios.get(`${process.env.REACT_APP_BACKEND}/conversations/personal/${tempId}`)
      .then((res)=>{
        const data = res.data.data
        setConversations(data)
      })
      .catch((err)=>{
        console.log(err)
      })
    axios.get(`${process.env.REACT_APP_BACKEND}/messages/d59a831c-19ad-4cdb-a3cd-028e703a4708`)
      .then((res)=>{
        console.log(res.data.data)
        const data = res.data.data
        setListMessage(data)
      })
      .catch((err)=>{
        console.log(err)
      })
    if(!tempId){navigate("/login")}
    setId(tempId)
    setToken(localStorage.getItem("token"))
    setRoomId("d59a831c-19ad-4cdb-a3cd-028e703a4708")
    const tempSocket = io("http://localhost:4000", {query: `id=${tempId}`})
    setSocket(tempSocket)
    tempSocket.on("receiveMessage", (data) => {
      setListMessage(listMessage => [
        ...listMessage,
        data
      ])
    })
  }, [])
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND}/users/${id}`)
      .then((res) => {
        const data = res.data.data[0]
        let tempEditForm = {};
        for (const property in editForm) {
          tempEditForm = {
            ...tempEditForm,
            [property]: data[property]
          }
        }
        setEditForm(tempEditForm)
        setProfilePhoto(data.photo)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id, trigger])
  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-xl-3 col p-0 border-end border-white border-2 overflow-auto vh-100' style={{ backgroundColor: "#efe8e8" }}>
            <div className='d-flex p-2 justify-content-between align-items-center' style={{ backgroundColor: "#b194aa" }}>
              <h1 className='text-center h2' style={{ color: "#fcf8e3" }}>Chachat</h1>
              <div className="dropdown">
                <Link className="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={Menu} alt="" />
                </Link>
                <ul className="dropdown-menu">
                  <li><button className=" dropdown-item" onClick={handleProfileSwitch}>Profile</button></li>
                </ul>
              </div>
            </div>
            {profile ?
              <>
                <div className='d-flex gap-1 flex-column align-items-center mt-2'>
                  <h1 className='fs-4 text-center'>
                    <b style={{ color: "#b194aa" }}>
                      Edit Profile
                    </b>
                  </h1>
                  {profilePhoto !== "photo.jpg" ?
                    <img src={profilePhoto} className='rounded-circle' width={130} alt="" />
                    :
                    <img src={Person1} className='rounded-circle' width={130} alt="" />
                  }
                  <div className='d-flex flex-column gap-2'>
                    <div className=''>
                      <label htmlFor="photo" className="my-0 form-label text-secondary">Edit Photo</label>
                      <input onChange={handleEditPhotoChange} placeholder='Photo' type="file" className="form-control" id="photo" name='photo' />
                    </div>
                    <div className=''>
                      <label htmlFor="name" className="my-0 form-label text-secondary">Nama Lengkap</label>
                      <input value={editForm.name} onChange={handleEditChange} placeholder='Name' type="text" className="form-control" id="name" />
                    </div>
                    <div className=''>
                      <label htmlFor="email" className="my-0 form-label text-secondary">Email</label>
                      <input value={editForm.email} onChange={handleEditChange} placeholder='Email' type="text" className="form-control" id="email" />
                    </div>
                    <div className=''>
                      <label htmlFor="phone" className="my-0 form-label text-secondary">Phone</label>
                      <input value={editForm.phone} onChange={handleEditChange} placeholder='Phone' type="text" className="form-control" id="phone" />
                    </div>

                    <Button height={"40px"} onClick={handleEdit}>Update</Button>
                    <Button height={"40px"} onClick={() => {
                      setTrigger(!trigger)
                    }}>Batal</Button>
                  </div>
                </div>
              </>
              :
              <div>
                <div className='px-2 m-2'>
                  <input
                    type="text"
                    className={`form-control rounded-pill`}
                    id="search"
                    name="search"
                    placeholder="Search name"
                  />
                </div>
                {conversations.length !== 0 ? conversations.map((element, index)=>{
                  return(
                  <PrivateChat key={index} handleClick={(event)=>{console.log(event.target.id)}} id={element.id} name={`${element.friend.name}`} time='22:00' notif="3" chat="hello baaang" image={element.friend.photo} />
                  )
                }): <></>}
              </div>
            }
          </div>
          <div className='col vh-100 d-xl-flex flex-column d-none p-0'>
            <div className='w-100 border-0 d-flex justify-content-between p-2' style={{ backgroundColor: "#b194aa" }}>
              <div className='d-flex gap-2 align-items-center'>
                {conversations.length !== 0 ? conversations[0].friend.photo !== "photo.jpg"? 
                <img className='rounded-circle' src={conversations[0].friend.photo} alt="" width={70} />
                :
                <img className='rounded-circle' src={Person1} alt="" width={70} />:<></>
                }
                <div className='d-flex flex-column align-items-start'>
                  <span className='fs-4' style={{ color: "#fcf8e3" }}>
                    <b>
                      {conversations.length !== 0? conversations[0].friend.name: <></>}
                    </b>
                  </span>
                  <span className='text-secondary' style={{ fontSize: "14px" }}>Online</span>
                </div>
              </div>
              <div className='d-flex flex-column justify-content-center align-items-end'>
                <img src={Menu} alt="" />
              </div>
            </div>
            {/* <div className='d-flex align-items-center justify-content-center text-center h-100'>
              <span className='text-secondary'>Start messaging</span>
            </div> */}
            <div className='d-flex flex-column flex-grow-1 overflow-auto justify-content-end '>
              <div className='h-100'>
                {listMessage ?
                  listMessage.map((element, index) => {
                    let isSelf = false
                    if (element.sender_id == id) {
                      isSelf = true
                    }
                    return (
                      <BubbleChat key={index} self={isSelf} image={Person1} chat={`${element.message}`} />
                    )
                  })
                  :
                  <></>
                }
              </div>
            </div>
            <div className='d-flex gap-2 p-2'>
              <input
                value={message}
                onChange={handleMessageChange}
                type="text"
                className={`form-control`}
                id="chat"
                name="chat"
                placeholder="Tuliskan pesan"
              />
              <Button onClick={handleMessage}>Kirim</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home