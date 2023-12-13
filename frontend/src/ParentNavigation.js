import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { MdDashboard, MdOutlineSell, MdInventory } from "react-icons/md";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { FaMoneyCheck, FaUsers, FaMoneyCheckAlt } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col gap-4 py-4 w-screen'>
      <button className='flex flex-row gap-2 items-center pl-2 pr-12 w-fit' onClick={() => { navigate('/') }}>
        <img src="https://static.vecteezy.com/system/resources/thumbnails/004/334/170/small/hand-drawn-smoothie-cocktail-element-vector.jpg" alt="Juice" className='w-16' />
        <p className="text-4xl font-semibold text-orange-800 font-[Poppins] whitespace-nowrap tracking-tight">Essha Traders</p>
      </button>
      <div className='flex flex-row gap-6 w-full'>
        <div className='flex flex-col pl-4 w-1/5'>
          <NavButton title='Dashboard' link='/' icon={<MdDashboard />} />
          <NavButton title='Sales Collection' link='/collection' icon={<FaMoneyCheckAlt />} />
          <NavButton title='Sales' link='/sales' icon={<MdOutlineSell />} />
          <NavButton title='Purchases' link='/purchases' icon={<BiSolidPurchaseTag />} />
          <NavButton title='Inventory' link='/inventory' icon={<MdInventory />} />
          <NavButton title='Financials' link='/financials' icon={<FaMoneyCheck />} />
          <NavButton title='Parties' link='/parties' icon={<FaUsers />} />
          <NavButton title='Yearly Summary' link='/yearly-summary' icon={<IoCalendarOutline />} />
        </div>

        <div className='w-full'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const NavButton = ({ title, link, icon }) => {
  const navigate = useNavigate();
  const loc = window.location.pathname;

  return (
    <button
      className={`p-2 rounded-xl text-left text-lg flex flex-row items-center gap-3 ${((loc === link) || (link !== '/' && loc.startsWith(link))) ? 'text-orange-700 font-semibold bg-orange-100' : 'text-gray-700 font-medium'}`}
      onClick={() => navigate(link)}
    >
      {icon && React.cloneElement(icon)} {title}
    </button>
  )
}

export default Navigation;