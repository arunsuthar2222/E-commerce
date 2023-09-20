import React, {useEffect, useState} from 'react'
import './Banner.css'
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai'
function Banner() {
const [count, setCount] = useState(0)

const handleLeft = () =>{
    if(count === 0){
        setCount(3)
    }
    else{
        setCount((prev) => prev - 1)
    }
}

const handleRight = () =>{
    if(count === 3){
        setCount(0)
    }
    else{
        setCount((prev) => prev + 1)
    }
}

useEffect(()=>{
    
setTimeout(()=>{
if(count >= 3){
    setCount(0)
}
else{
    setCount(prev => prev + 1)
}
}, 3500)
}, [count])
  return (
    <div className='relative w-screen'>
        <button className='absolute top-[30%] left-[3%] text-gray-900' onClick={handleLeft}><AiOutlineLeft className='text-4xl'/></button>

        <button className='absolute top-[30%] right-[3%]' onClick={handleRight}><AiOutlineRight className='text-4xl text-gray-900'/></button>
    <div className='flex -mb-[130px]'>
        <img className={`home_image`} style={{transform : `translateX(-${100 * count}%)`}}
        src="https://m.media-amazon.com/images/I/81BYl+rRKdL._SX3000_.jpg" alt="" />
        <img className={`home_image`} style={{transform : `translateX(-${100 * count}%)`}}
        src="https://m.media-amazon.com/images/I/81g53SU4QfL._SX3000_.jpg" alt="" />
        <img className={`home_image`} style={{transform : `translateX(-${100 * count}%)`}}
        src="https://m.media-amazon.com/images/I/91PmFTcddQL._SX3000_.jpg" alt="" />
        <img className={`home_image`} style={{transform : `translateX(-${100 * count}%)`}}
         src="https://m.media-amazon.com/images/I/818+Tt5fZ0L._SX3000_.jpg" alt="" />
    </div>
    </div>
    
  )
}

export default Banner