import React from 'react'
import Person1 from '../assets/Person1.png'

const PrivateChat = ({name, image, time, notif, chat, handleClick, id}) => {
  return (
    <>
      <button onClick={handleClick} id={id} className='w-100 border-0 d-flex justify-content-between p-3'>
        <div className='d-flex gap-2 align-items-center'>
          {image != "photo.jpg"? 
          <img className='rounded-circle' src={image} alt="" width={70} />
          :
          <img className='rounded-circle' src={Person1} alt="" width={70} />
          }
          <div className='d-flex flex-column align-items-start'>
            <span className='fs-4 text-dark'>
              <b>
                {name}
              </b>
            </span>
            <span className='text-secondary'>{chat}</span>
          </div>
        </div>
        <div className='d-flex flex-column justify-content-center align-items-end'>
          <span>
            {time}
          </span>
          <div className='rounded-circle d-flex align-items-center justify-content-center' style={{ width: "30px", height: "30px", backgroundColor: "#b194aa" }}>
            <span className='text-white'>
              {notif}
            </span>
          </div>
        </div>
      </button>
    </>
  )
}

export default PrivateChat