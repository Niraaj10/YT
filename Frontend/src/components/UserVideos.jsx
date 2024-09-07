
import React from 'react'


const UserVideos = ({ userDetails }) => {

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

    // console.log(userDetails)

    return (
        <>
            <div>
                UserVideos

                <div className='grid grid-cols-4'>

                    {
                        userDetails?.allvideos?.map((video, index) => (
                            <>
                            <div key={video._id} className='videoCard w-[18vw] h-[30vh]  rounded-xl'>
                                <img src={video.thumbnail} alt="" className='w-[18vw] h-[20vh] object-cover rounded-2xl' />

                                <div className='px-5 mt-3'>
                                    <div className='flex items-center gap-3'>
                                        <h2 className='font-bold'>{video.title}</h2>
                                    </div>

                                    <div className='text-sm  font-semibold text-gray-400 flex gap-2'>
                                        <p>{video.views} views</p>
                                        <p> • {timeAgo(video.createdAt)} </p>
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

export default UserVideos