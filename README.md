<br />
<p align="center">
  <div align="center">
    <img height="150" src="#" alt="Chachat" border="0"/>
  </div>
  <h3 align="center">Chachat (Messaging App)</h3>
  <p align="center">
    <a href="https://github.com/ikkair/chachat-fe"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://chachat-fe-ikkair.vercel.app/">View Demo</a>
  </p>
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisite](#prerequisites)
  - [Installation](#installation)
- [Screenshots](#screenshots)
- [Related Project](#related-project)

# About The Project

Chachat is a website that has been created to facilitate communication among users through real-time messaging. Users are able to create an account, modify their profile, and engage in text-based communication with others.

## Built With

These are the libraries used for building this frontend

- [React](https://reactjs.org/)
- [Bootstrap](https://getbootstrap.com/)
- [Sweetalert2](https://sweetalert2.github.io)
- [Axios](https://axios-http.com)
- [Socket.io](https://socket.io)
- [Redux](https://redux.js.org)

# Getting Started

## Prerequisites

You'll need these programs installed before proceeding to installation

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download)

This project requires [chachat-backend](https://github.com/ikkair/chachat-be) to function properly, follow the steps provided in the readme to install and run the backend API

## Installation

Follow this steps to run the server locally

1. Clone this repository

```sh
git clone https://github.com/ikkair/chachat-fe.git
```

2. Change directory to chatter-frontend

```sh
cd chachat-fe
```

3. Install all of the required modules

```sh
npm install
```

4. Create and configure `.env` file in the root directory, example env are provided in [.env.example](./.env.example)

```env
REACT_APP_BACKEND=[ Backend URL ]
```

5. Run this command to run the server

```sh
npm start
```

- Run this command to build this website into production ready

```sh
npm build
```

# Screenshots

<table>
  <tr>
    <td><img width="350px" src="./public/docs/Chachat Login.png" border="0" alt="Login" /></td>
    <td><img width="350px" src="./public/docs/Chachat Login Success.png" border="0"  alt="Login Success" /></td>
  </tr>
   <tr>
    <td>Login</td>
    <td>Login Success</td>
  </tr>
  <tr>
    <td><img width="350px" src="./public/docs/Chachat Register.png" border="0" alt="Register" /></td>
    <td><img width="350px" src="./public/docs/Chachat Register Success.png" border="0"  alt="Register Success" /></td>
  </tr>
   <tr>
    <td>Register</td>
    <td>Register Success</td>
  </tr>
  <tr>
    <td><img width="350px" src="./public/docs/Chachat Home.png" border="0" alt="Home" /></td>
    <td><img width="350px" src="./public/docs/Chachat Profile.png" border="0"  alt="Profile" /></td>
  </tr>
   <tr>
    <td>Home</td>
    <td>Profile</td>
  </tr>
  <tr>
    <td><img width="350px" src="./public/docs/Chachat Delete Message.png" border="0" alt="Delete Message" /></td>
    <td><img width="350px" src="./public/docs/Chachat Delete Message Success.png" border="0"  alt="Delete Message Success" /></td>
  </tr>
   <tr>
    <td>Delete Message</td>
    <td>Delete Message Success</td>
  </tr>
</table>

# Related Project

:rocket: [`Frontend Chachat`](https://github.com/ikkair/chachat-fe)

:rocket: [`Backend Chachat`](https://github.com/ikkair/chachat-be)

:rocket: [`Demo Chachat`](https://chachat-fe-ikkair.vercel.app/)
