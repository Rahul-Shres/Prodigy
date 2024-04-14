import React from 'react'
import {Link} from "react-router-dom";

import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>{
    // first prevent the default behaviour
    e.preventDefault();
    // get the href and remove everything before the hash (#)
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/,"");
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior : "smooth"
    })
  }
  return (
    <nav className="fixed top-10 left-0 right-0 z-50 my-0  mx-auto  flex w-[306px] items-center justify-center gap-1 rounded-lg bg-[#008DDA] px-1 py-1 text-[#e4ded7] backdrop-blur-md sm:w-[383.3px] md:p-2 lg:w-[500px]">
       <a
        href='https://drive.google.com/file/d/1Mmwl-FRGPm5QVe3AjtukJr_Jpc366Ear/view'
        target='_blank'
        rel='noopener noreferrer'
        className='flex'
        
        data-blobity-tooltip='View Resume'
        data-blobity-magnetic='false'
      >Open Resume</a>

      <a href="#home" className='flex' onClick={handleScroll}>
              <h4 className='rounded py-2 px-2 sm:px-4 text-[12px] sm:text-[14px] md:py-1 md:px-4'>Role</h4>
      </a>
      <a href="#work" className='' onClick={handleScroll}>
      <h4 className='rounded py-2 px-2 sm:px-4 text-[12px] sm:text-[14px] md:py-1 md:px-4'>Portfolio</h4>
      </a>
      <a href="#about"  className='flex' onClick={handleScroll}>
      <h4 className='rounded py-2 px-2 sm:px-4 text-[12px] sm:text-[14px] md:py-1 md:px-4'>Reviews</h4>
      </a>
      <a href="#contact"  className='flex' onClick={handleScroll}>
      <h4 className='rounded py-2 px-2 sm:px-4 text-[12px] sm:text-[14px] md:py-1 md:px-4'>Contact</h4>
      </a>
    </nav>
  )
}

export default Navbar