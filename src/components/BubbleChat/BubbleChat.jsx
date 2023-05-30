import React from 'react'
import { Link } from 'react-router-dom'

const BubbleChat = ({ image, chat, self, deleteId, messageId }) => {
  let reverse = "flex-row-reverse"
  let target = "#exampleModal"
  let modal = "modal"
  let Del = () => {
    deleteId(messageId)
  }
  if (!self) {
    reverse = ""
    target = ""
    modal = ""
  }
  return (
    <>
      <div className={`d-flex align-items-center gap-2 p-2 ${reverse} `}>
        <button onClick={Del} className='align-self-start border-0 bg-transparent' data-bs-toggle={modal} data-bs-target={target}>
          <img src={image} className='rounded-circle' width={60} alt="" />
        </button>
        <div className='rounded-2 d-flex justify-content-center align-items-center p-2' style={{ backgroundColor: "#b194aa", maxWidth: "60%" }}>
          <span className='text-white text-break'>{chat}</span>
        </div>
      </div>
    </>
  )
}

export default BubbleChat