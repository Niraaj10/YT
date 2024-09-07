import React, { useContext, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { UserContext } from '../globalState/userState'
import UserDTab from './UserDTab'
import axios from 'axios'

const UserDetails = () => {
    const { user } = useContext(UserContext)
    const baseUrl = 'http://localhost:7000/api/v1';
    const [userChannelDetails, setUserChannelDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // console.log(userChannelDetails)
    // console.log(user)

    const userChannelStats = async () => {
        try {
            const res = await axios.get(`${baseUrl}/dashboard/channelstats/${user._id}`,
                {
                    withCredentials: true
                })

            // console.log(res);
            setIsLoading(false)
            setUserChannelDetails(res.data.message)

        } catch (error) {
            setIsLoading(false)
            alert(error.message)
        }
    }

    useEffect(() => {
        userChannelStats()
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


            </div>
        );
    }


    return (
        <>
            <div className='UserDetails px-11 overflow-y-scroll scrollbar-hide h-[90vh] relative'>
                UserDetails

                <div className=''>
                    <div className='firstCont'>
                        <div>
                            <img src={user?.coverImage} alt="" className='object-cover w-[80vw] h-[20vh] rounded-2xl' />
                        </div>

                        <div className='flex items-center gap-10 mt-5'>
                            <div className=''>
                                <img src={user?.avatar} alt="" className='object-cover w-[11vw] h-[20vh] rounded-full' />
                            </div>

                            <div className='flex flex-col '>
                                <h1 className='text-3xl font-bold'>{user?.fullname}</h1>

                                <div className='text-[#9e9e9e] flex gap-2 mt-3'>

                                    <h1 className=' font-bold'>@{user?.username}</h1>
                                    <h1>• Subscribers : <span className='font-bold'>{userChannelDetails?.totalSubs}</span></h1>
                                    <h1>• Total Videos : <span className='font-bold'>{userChannelDetails?.totalVideos}</span></h1>
                                    <h1>• Total Views : <span className='font-bold'>{userChannelDetails?.totalViews}</span></h1>
                                    <h1>• following : <span className='font-bold'>{userChannelDetails?.subscribedTo}</span></h1>
                                </div>
                            </div>

                            {/* <div>
                                <button></button>
                            </div> */}
                        </div>
                    </div>


                    <div className='Midcontainer'>
                        <UserDTab userDetails={userChannelDetails} />
                    </div>


                    <div className='Second container'>

                    </div>
                </div>

            </div>
        </>
    )
}

export default UserDetails