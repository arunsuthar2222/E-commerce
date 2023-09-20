import React from 'react'
import { Link } from 'react-router-dom';
function Catagory() {
  return (
    <div className='bg-[#232f3e] items-center text-slate-100 justify-between px-4 flex'>
      <div className='space-x-3 text-[15px] font-medium ml-2 tracking-wide'>
      <Link to="/">All</Link>
      <Link to="/">Electonics</Link>
      <Link to="/">Fashion</Link>
      <Link to="/">Grocessory</Link>
      <Link to="/">Sports</Link>
      <Link to="/">Beauty</Link>
      <Link to="/">Prime</Link>
      </div>
      <img alt="" src="https://m.media-amazon.com/images/G/31/AmazonVideo/2021/X-site/SingleTitle/Hit2/400x39-SWM_NP._CB617027672_.jpg" />
    </div>
  )
}

export default Catagory