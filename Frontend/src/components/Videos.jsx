import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const Videos = () => {
  const [videos, setVideos] = useState({});
  const baseUrl = 'http://localhost:7000/api/v1';
  const [isLoading, setIsLoading] = useState(true);

  const allVideos = async () => {
    try {
      const res = await axios.get(`${baseUrl}/video`)

      // console.log(res.data);
      setVideos(res.data.data.AllVidoes)
      setIsLoading(false)
      // console.log(res.data.data.AllVidoes)
    } catch (error) {
      setIsLoading(false)
      alert(error.message)
    }
  }
  // console.log(videos)

  useEffect(() => {
    allVideos()
  }, [])


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
      <div className='VideoPage  px-11 w-full '>
        Videos

        <div className='VideosContainer overflow-y-scroll scrollbar-hide h-[88vh] grid grid-cols-3 gap-11'>
          {
            Array.isArray(videos) && videos?.map(video => (
              <div key={video._id} className='videoCard w-[24vw] h-[42vh]  rounded-xl'>
                <img src={video.thumbnail || <Skeleton />} alt="" className='w-[24vw] h-[28vh] object-cover rounded-2xl' />

                <div className='px-5 mt-3'>
                  <div className='flex items-center gap-3'>
                    <img src={video.owner.avatar  || <Skeleton />} alt="" className='w-[35px] h-[4vh] object-cover rounded-full' />
                  <h2 className='font-bold'>{video.title || <Skeleton /> }</h2>
                  </div>

                  <div className='text-sm pl-12 font-semibold text-gray-400'>
                    <p>{video.owner.username || <Skeleton />}</p>
                    <p>{video.views} views</p>
                  </div>

                </div>
              </div>
            ))
          }



          
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