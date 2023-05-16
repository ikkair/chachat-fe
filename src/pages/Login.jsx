import React, { useState } from 'react'
import Button from '../components/Button/Button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const Login = () => {
  const navigate = useNavigate()
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: ""
  })
  const handleLoginChange = (event) => {
    setFormLogin({
      ...formLogin,
      [event.target.id]: event.target.value
    })
  }
  const handleLogin = (event) => {
    event.preventDefault()
    console.log(formLogin)
    axios.post(`${process.env.REACT_APP_BACKEND}/users/login`, formLogin)
      .then((res) => {
        console.log(res.data.data[0])
        Swal.fire({
          title: `Login Success`,
          text: `${res.data.message}`,
          icon: 'success',
        });
        const data = res.data.data[0]
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.id);
        localStorage.setItem('photo', data.photo);
        navigate("/")
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          Swal.fire({
            title: `Login Failed`,
            text: `${err.response.data.message}`,
            icon: 'error',
          });
        } else {
          Swal.fire({
            title: `Login Failed`,
            text: `Unknown issue, please contact admin`,
            icon: 'error',
          });
        }
        setFormLogin({
          email: "",
          password: ""
        })
      })
  }
  return (
    <>
      <div className='vh-100 d-flex justify-content-center' style={{backgroundColor: "#c0b29b"}}>
        <div className='my-auto rounded-4 p-3 col-lg-5 gap-2 col d-flex flex-column bg-white'>
          <h1 className='fs-3 text-center'>
            <b style={{color: "#b194aa"}}>
              Login
            </b>
          </h1>
          <span>
            Hi, Welcome Back
          </span>

          <div className="">
            <label htmlFor="email" className={`m-0 form-label text-secondary`} style={{ fontSize: "14px" }}>Email</label>
            <div>
              <input
                type="text"
                value={formLogin.email}
                onChange={handleLoginChange}
                className={`form-control`}
                id="email"
                name="email"
                placeholder="Masukkan alamat email"
              />
            </div>
          </div>

          <div className="">
            <label htmlFor="password" className={`m-0 form-label text-secondary`} style={{ fontSize: "14px" }}>Password</label>
            <div>
              <input
              value={formLogin.password}
                onChange={handleLoginChange}
                type="password"
                className={`form-control`}
                id="password"
                name="password"
                placeholder="Masukkan password"
              />
            </div>
          </div>
          <span className='text-end' style={{color: "#b194aa"}}>Forgot Password</span>
          <Button onClick={handleLogin}>
            Login
          </Button>
          <span className='text-center'>Dont have account? {" "}
            <Link to={"/register"} className='text-decoration-none' style={{color: "#b194aa"}}>
              Register
            </Link>
          </span>
        </div>
      </div>
    </>
  )
}

export default Login