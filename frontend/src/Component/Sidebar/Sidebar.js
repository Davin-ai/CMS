import React from 'react'
import './Sidebar.css'
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
import { LuUsers } from "react-icons/lu";
import { IoBagCheckOutline } from "react-icons/io5";
import { FaDollarSign } from "react-icons/fa";
import { NavLink } from 'react-router-dom';


export default function Sidebar() {
  return (
    <div className='sidebar'>
      <h1 className='sidebar-title'>
        به داشبورد خود خوش آمدید
      </h1>
      <ul className='sidebar-links'>
        <NavLink to='/prouduct'>
          <AiOutlineHome className='icon' />
          صفحه اصلی
        </NavLink>
        <NavLink to='/prouduct'>
          <MdOutlineProductionQuantityLimits className='icon' />
          محصولات
        </NavLink>
        <NavLink to='/comments'>
            <BiCommentDetail className='icon' />
            کامنت ها
        </NavLink>
        <NavLink to='/users'>
            <LuUsers className='icon' />
            کاربران
        </NavLink>
        <NavLink to={'/orders'}>
            <IoBagCheckOutline className='icon' />
            سفارشات
        </NavLink>
        <NavLink to='/ofers'>
            <FaDollarSign className='icon' />
            تخفیفات
        </NavLink>
      </ul>
    </div>
  )
}
