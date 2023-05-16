import React from 'react'

const BubbleChat = ({image, chat, self}) => {
  let reverse = "flex-row-reverse"
  if(!self){
    reverse = ""
  }
  return (
    <>
      <div className={`d-flex align-items-center gap-2 p-2 ${reverse} `}>
        <img src={image} className='rounded-circle align-self-start' width={60} alt="" />
        <div className='rounded-2 d-flex justify-content-center align-items-center p-2' style={{ backgroundColor: "#b194aa", maxWidth: "60%" }}>
          <span className='text-white text-break'>{chat}</span>
        </div>
      </div>
    </>
  )
}

export default BubbleChat