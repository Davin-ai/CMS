import React from 'react'
import './Header.css'
import { FaRegBell } from "react-icons/fa";
import { BsBrightnessHigh } from "react-icons/bs";


function Header() {
  return (
    <div className='header'>
      <div className="admin-profile">
        <img src="/images/profile.jpg" alt="" />
        <div>
          <h1>محمد مهدی صادقی</h1>
          <h3>ادمین</h3>
        </div>
      </div>
      <div className="header-left-section">
        <div className="search">
          <input type="text" placeholder=' جست و جو کنید....' />
          <button>جستجو</button>
        </div>
        <button className='header-left-icon'><FaRegBell/></button>
        <button className='header-left-icon'><BsBrightnessHigh/></button>
      </div>
    </div>
  )
}

export default Header