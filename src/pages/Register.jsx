import React, { useState } from 'react'
import Button from '../components/Button/Button'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
// import Swal from 'sweetalert2'

const Register = () => {
  const navigate = useNavigate()
  const [formRegister, setFormRegister] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  })
  const handleRegisterChange = (event) => {
    setFormRegister({
      ...formRegister,
      [event.target.id]: event.target.value
    })
  }
  const handleRegister = (event) => {
    event.preventDefault()
    console.log(formRegister)
    axios.post(`${process.env.REACT_APP_BACKEND}/users/register`, formRegister)
      .then((res) => {
        console.log(res.data.data[0])
        Swal.fire({
          title: `Register Success`,
          text: `${res.data.message}`,
          icon: 'success',
        });
        navigate("/login")
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          Swal.fire({
            title: `Register Failed`,
            text: `${err.response.data.message}`,
            icon: 'error',
          });
        } else {
          Swal.fire({
            title: `Register Failed`,
            text: `Unknown issue, please contact admin`,
            icon: 'error',
          });
        }
        setFormRegister({
          email: "",
          password: ""
        })
      })

  }
  return (
    <>
      <div className='vh-100 d-flex justify-content-center' style={{ backgroundColor: "#c0b29b" }}>
        <div className='my-auto rounded-4 p-3 col-lg-5 gap-2 col d-flex flex-column bg-white'>
          <h1 className='fs-3 text-center'>
            <b style={{ color: "#b194aa" }}>
              Register
            </b>
          </h1>
          <span>Let's create your account</span>
          <div className="">
            <label htmlFor="name" className={`m-0 form-label text-secondary`} style={{ fontSize: "14px" }}>Name</label>
            <div>
              <input
                value={formRegister.name}
                onChange={handleRegisterChange}
                type="text"
                className={`form-control`}
                id="name"
                name="name"
                placeholder="Masukkan nama"
              />
            </div>
          </div>

          <div className="">
            <label htmlFor="email" className={`m-0 form-label text-secondary`} style={{ fontSize: "14px" }}>Email</label>
            <div>
              <input
                value={formRegister.email}
                onChange={handleRegisterChange}
                type="text"
                className={`form-control`}
                id="email"
                name="email"
                placeholder="Masukkan alamat email"
              />
            </div>
          </div>
<div className="">
            <label htmlFor="phone" className={`m-0 form-label text-secondary`} style={{ fontSize: "14px" }}>Phone</label>
            <div>
              <input
                value={formRegister.phone}
                onChange={handleRegisterChange}
                type="text"
                className={`form-control`}
                id="phone"
                name="phone"
                placeholder="Masukkan nomor handphone"
              />
            </div>
          </div>

          <div className="">
            <label htmlFor="password" className={`m-0 form-label text-secondary`} style={{ fontSize: "14px" }}>Password</label>
            <div>
              <input
                value={formRegister.password}
                onChange={handleRegisterChange}
                type="password"
                className={`form-control`}
                id="password"
                name="password"
                placeholder="Masukkan password"
              />
            </div>
          </div>
          <Button onClick={handleRegister}>Register</Button>
          <span className='text-center'>Already have an account? {" "}
            <Link to={"/login"} className='text-decoration-none' style={{ color: "#b194aa" }}>Login</Link>
          </span>
        </div>
      </div>
    </>
  )
}

export default Register