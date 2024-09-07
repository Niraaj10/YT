import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../globalState/userState';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import axios from 'axios';
import Cookies from 'js-cookie';
import { RiPlayList2Fill } from "react-icons/ri";


const UserPlaylist = () => {
  const { user } = useContext(UserContext) 
  const baseUrl = 'http://localhost:7000/api/v1';
  const [isLoading, setIsLoading] = useState(true); 
  const [playlist, setPlaylist] = useState([]);
  
  console.log(playlist)

  const userPlaylist = async () => {
    try {
      const res = await axios.get(`${baseUrl}/playlist/userplaylists/${user._id}`,{
        withCredentials: true
    })

      // console.log(res.data.message.userPlaylists);
      setPlaylist(res.data.message.userPlaylists)
      setIsLoading(false)
      
    } catch (error) {
      setIsLoading(false)
      alert(error.message)
    }
  }
  // console.log(videos)

  useEffect(() => {
    userPlaylist()
  }, [])


  function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return `${interval} year${interval > 1 ? "s" : ""} ago`;
  
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval} month${interval > 1 ? "s" : ""} ago`;
  
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval} day${interval > 1 ? "s" : ""} ago`;
  
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval} hour${interval > 1 ? "s" : ""} ago`;
  
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return `${interval} minute${interval > 1 ? "s" : ""} ago`;
  
    return `${Math.floor(seconds)} second${seconds > 1 ? "s" : ""} ago`;
  }



  if (isLoading) {
    return (
      <div className='grid grid-cols-3 gap-11'>

      <div className='LoadingSkeleton mx-5 h-[40vh] z-40 flex flex-col bg-[#0f0f0f] border border-[#303030] rounded-3xl p-3'>
        
        <div className='flex flex-col gap-2'>
          <div className='flex  flex-col'>
            <div className='relative overflow-hidden rounded-2xl'>
              <Skeleton className='w-[24vw] h-[25vh] rounded-2xl object-cover' />
            </div>

            <div className='py-3 px-4 w-48'>
              <Skeleton width='100%' height={20} />
              <Skeleton width='60%' height={15} className='mt-2' />
              <Skeleton width='40%' height={15} className='mt-1' />
            </div>
          </div>

        </div>
      </div>


      <div className='LoadingSkeleton mx-5 h-[40vh] z-40 flex flex-col bg-[#0f0f0f] border border-[#303030] rounded-3xl p-3'>
        
        <div className='flex flex-col gap-2'>
          <div className='flex  flex-col'>
            <div className='relative overflow-hidden rounded-2xl'>
              <Skeleton className='w-[24vw] h-[25vh] rounded-2xl object-cover' />
            </div>

            <div className='py-3 px-4 w-48'>
              <Skeleton width='100%' height={20} />
              <Skeleton width='60%' height={15} className='mt-2' />
              <Skeleton width='40%' height={15} className='mt-1' />
            </div>
          </div>

        </div>
      </div>


      <div className='LoadingSkeleton mx-5 h-[40vh] z-40 flex flex-col bg-[#0f0f0f] border border-[#303030] rounded-3xl p-3'>
        
        <div className='flex flex-col gap-2'>
          <div className='flex  flex-col'>
            <div className='relative overflow-hidden rounded-2xl'>
              <Skeleton className='w-[24vw] h-[25vh] rounded-2xl object-cover' />
            </div>

            <div className='py-3 px-4 w-48'>
              <Skeleton width='100%' height={20} />
              <Skeleton width='60%' height={15} className='mt-2' />
              <Skeleton width='40%' height={15} className='mt-1' />
            </div>
          </div>

        </div>
      </div>








      {/* <div className='LoadingSkeleton mx-5 h-[35vh] z-40 flex flex-col bg-[#0f0f0f] border border-[#303030] rounded-3xl p-3'>
        
        <div className='flex flex-col gap-2'>
          <div className='flex lg:flex-row md:flex-row flex-col'>
            <div className='relative overflow-hidden rounded-2xl'>
              <Skeleton className='lg:w-[6vw] lg:h-[12vh] rounded-2xl object-cover' />
            </div>

            <div className='py-3 px-4 w-48'>
              <Skeleton width='100%' height={20} />
              <Skeleton width='60%' height={15} className='mt-2' />
              <Skeleton width='40%' height={15} className='mt-1' />
            </div>
          </div>

          <div className='flex lg:flex-row flex-col lg:justify-center items-center gap-2'>
            <Skeleton width='100px' height={40} />
            
          </div>
        </div>
      </div> */}

  

      </div>
    );
  }

  return (
    <>
    <div>
        UserPlaylist

      <div className='UserPlaylist grid grid-cols-4 gap-4'>
        {
          playlist.map((playlist) => (
            <>
            <div key={playlist._id} className='videoCard w-[18vw] h-[30vh]  rounded-xl'>
              <div className='relative'>
                <img src={playlist?.videos[0]?.thumbnail} alt="" className='w-[18vw] h-[20vh] object-cover rounded-2xl' />

                
              </div>

                <div className='px-5 mt-3'>
                    <div className='flex items-center gap-3'>
                        <h2 className='font-bold'>{playlist.name}</h2>
                    </div>

                    <div className='text-sm  font-semibold text-gray-400 flex gap-2'>
                        {/* <p>{video.views} views</p> */}
                        <p> • Updated {timeAgo(playlist.updatedAt)} </p>
                    </div>

                </div>
            </div>




            




            

            </>
          ))
        }
      </div>
    </div>
    </>
  )
}

export default UserPlaylist