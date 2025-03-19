import React from 'react'
import logo from '../../assets/logo.png';
import {Link} from 'react-router-dom'

import './navbar.css'
import navlogo from '../../assets/nav-logo.svg';
import navProfile from '../../assets/nav-profile.svg';
const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar-img '>
      <img src={logo} alt="Logo" className="navbar-admin" />
            <p className="text-xl font-bold ml-2">WishWhirl</p>
            </div>
{/* <img src={navlogo} alt="" className='nav-logo' /> */}

<img src={navProfile} alt="" className="nav-profile" />

    </div>
  )
}

export default Navbar