import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Videos = () => {
  const [videos, setVideos] = useState({});
  const baseUrl = 'http://localhost:7000/api/v1';

  const allVideos = async () => {
    try {
      const res = await axios.get(`${baseUrl}/video`)

      // console.log(res.data);
      setVideos(res.data.data.AllVidoes)
      console.log(res.data.data.AllVidoes)
    } catch (error) {
      alert(error.message)
    }
  }
  // console.log(videos)

  useEffect(() => {
    allVideos()
  }, [])




  return (
    <>
      <div className='VideoPage  px-11 w-full '>
        Videos

        <div className='VideosContainer overflow-y-scroll scrollbar-hide h-[88vh] grid grid-cols-3 gap-11'>
          {
            Array.isArray(videos) && videos?.map(video => (
              <div key={video._id} className='videoCard w-[24vw] h-[42vh]  rounded-xl'>
                <img src={video.thumbnail} alt="" className='w-[24vw] h-[28vh] object-cover rounded-2xl' />

                <div className='px-5 mt-3'>
                  <div className='flex items-center gap-3'>
                    <img src={video.owner.avatar} alt="" className='w-[35px] h-[4vh] object-cover rounded-full' />
                  <h2 className='font-bold'>{video.title}</h2>
                  </div>

                  <div className='text-sm pl-12 font-semibold text-gray-400'>
                    <p>{video.owner.username}</p>
                    <p>{video.views} views</p>
                  </div>

                </div>
              </div>
            ))
          }



          
          

        </div>

      </div>
    </>
  )
}

export default Videos