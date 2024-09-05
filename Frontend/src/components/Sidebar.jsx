import React from 'react'
import { ImHome } from "react-icons/im";
import { AiFillYoutube } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { FaHistory } from "react-icons/fa";
import { RiPlayList2Fill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { TfiTwitterAlt } from "react-icons/tfi";






const Sidebar = ({ selectedCategory, setSelectedCategory }) => {

  console.log(selectedCategory)

  const sideContent = [
    { name: 'Home', icon: <ImHome />, link: '/' },
    { name: 'You', icon: <FaRegUser />, link: '/login' },
    { name: 'Playlist', icon: <RiPlayList2Fill />, link: '/videos' },
    { name: 'History', icon: <FaHistory />, link: '/' },
    { name: 'Your videos', icon: <AiFillYoutube />, link: '/' },
    { name: 'Liked videos', icon: <BiLike />, link: '/' },
  ];

  const bottomContent = [
    { name: 'You', icon: <FaRegUser />, link: '/login' },
    { name: 'Playlist', icon: <RiPlayList2Fill />, link: '/videos' },
    { name: 'Tweets', icon: <TfiTwitterAlt />, link: '/' },
    { name: 'History', icon: <FaHistory />, link: '/' },
    { name: 'Your videos', icon: <AiFillYoutube />, link: '/' },
  ];



  return (
    <>
      <div className='Sidebar hidden lg:block h-[91vh] w-[15vw] p-2 px-5 border-r border-[#303030]'>
        {/* Sidebar */}

        <div className='flex flex-col gap-5 mt-7'>
          {
            sideContent.map((content, index) => (
              <Link to={content.link} key={index} className='flex items-center gap-4 '>
                <span className='icon text-[25px] '>{content.icon}</span>
                <div className={`font-bold p-2 rounded-xl px-4 hover:bg-[#272727] transition-colors duration-300  ${content.name === selectedCategory ? 'bg-red-700' : 'bg-transparent '}`}
                  onClick={() => setSelectedCategory(content.name)}

                >{content.name}</div>
              </Link>
            ))
          }
        </div>
      </div>

      <div className='relative md:hidden lg:hidden h-[91vh] w-[15vw]'>
        <div className='absolute bottom-0 w-[100vw] px-8 flex justify-between'>
          {
            bottomContent.map((content, index) => (
              <Link to={content.link} key={index} className={`font-bold p-2 rounded-xl px-4 hover:bg-[#272727] transition-colors duration-300  ${content.name === selectedCategory ? 'bg-red-700' : 'bg-transparent '}`}>
                <span className='icon text-[20px] '
                onClick={() => setSelectedCategory(content.name)}>{content.icon}</span>
                {/* <div>{content.name}</div>  */}
              </Link>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Sidebar