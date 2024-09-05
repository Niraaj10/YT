import React from 'react'
import { ImHome } from "react-icons/im";
import { AiFillYoutube } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { FaHistory } from "react-icons/fa";
import { RiPlayList2Fill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";






const Sidebar = ({ selectedCategory, setSelectedCategory }) => {

  console.log(selectedCategory)

  const sideContent = [
    { name: 'Home', icon: <ImHome  />, },
    { name: 'You', icon: <FaRegUser />, },
    { name: 'Playlist', icon: <RiPlayList2Fill />, },
    { name: 'History', icon: <FaHistory />, },
    { name: 'Your videos', icon: <AiFillYoutube />, },
    { name: 'Liked videos', icon: <BiLike /> },
  ];
  return (
    <>
      <div className='Sidebar h-[91vh] w-[15vw] p-2 px-5 border-r border-[#303030]'>
        {/* Sidebar */}

        <div className='flex flex-col gap-5 mt-7'>
         {
          sideContent.map((content, index) => (
            <div key={index} className='flex items-center gap-4 '>
              <span className='icon text-[25px] '>{content.icon}</span>
              <div className={`font-bold p-2 rounded-xl px-4 hover:bg-[#272727] transition-colors duration-300  ${content.name === selectedCategory ? 'bg-red-600' : 'bg-transparent '}`}
              onClick={() => setSelectedCategory(content.name)}

              >{content.name}</div> 
            </div>
          ))
         }
        </div>
      </div>
    </>
  )
}

export default Sidebar