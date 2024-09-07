import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../globalState/userState';
import axios from 'axios';

const UserTweet = () => {
  const { user } = useContext(UserContext) 
  const baseUrl = 'http://localhost:7000/api/v1';
  const [isLoading, setIsLoading] = useState(true); 
  const [userTweet, setUserTweet] = useState([]);
  const [tweetLikes, setTweetLikes] = useState([]);
  
  console.log(userTweet) 
  console.log(tweetLikes)

  const userTweets = async () => {
    try {
      const res = await axios.get(`${baseUrl}/tweet/usertweets/${user._id}`,{
        withCredentials: true
    })

      // console.log(res.data.message);
      setUserTweet(res.data.message.userTweet)
      setIsLoading(false)
      
    } catch (error) {
      setIsLoading(false)
      alert(error.message)
    }
  }

  const tweetTotalLikes = async (tweetId) => {
    try {
      const res = await axios.get(`${baseUrl}/like/toggle/t/${tweetId}`,{
        withCredentials: true
    })

      console.log(res.data.message);
      setTweetLikes(res.data.message.totalLikes)
      setIsLoading(false)
      
    } catch (error) {
      setIsLoading(false)
      alert(error.message)
    }
  }
  // console.log(videos)

  useEffect(() => {
    userTweets();
    userTweet.forEach(tweet => {
      console.log(tweet._id)
      tweetTotalLikes(tweet._id);
    })
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




  return (
    <>
    <div>
        UserTweet

        <div className='border-t border-[#303030] m-4 p-2'>
          {
            userTweet.map(tweet => (
              <div key={tweet._id} className='border-b border-[#303030] p-5'>
                <div className='text-xl font-semibold'>{tweet.content}</div>
                
                <div className='text-xs pt-2 text-gray-500'>
                  <div className=''>{timeAgo(tweet.createdAt)}</div>
                </div>
              </div>
            ))
          }
        </div>
    </div>
    </>
  )
}

export default UserTweet