import React, { useContext } from 'react'
import { TfiTwitterAlt } from "react-icons/tfi";
import { RiSearch2Line } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { UserContext } from '../globalState/userState';




const Navbar = () => {
    const { user } = useContext(UserContext)
    return (
        <>
            <div className='p-4  '>
                {/* Navbar */}


                <div className='flex items-center justify-between'>
                    <div className='Icon flex justify-center items-center'>
                        {/* <IoMenu size={25} className=' mr-5 mt-[3px]' /> */}
                        <div className='font-bold text-2xl mr-[-3px]'>YouT</div>
                        <TfiTwitterAlt color='#FC1503' size={30} />
                    </div>

                    <div className='Serach flex justify-center items-center bg-[#121212] pl-5 border border-[#303030] rounded-3xl '>
                        <input type="text" className='bg-[#121212] outline-none  py-2 w-[25vw]' placeholder='Search....' />
                        <RiSearch2Line color='red' size={20} className='ml-2 bg-[#121212] mr-4  ' />
                    </div>

                    <div className='Login bg-[#272727] border border-[#303030] rounded-3xl px-6 flex justify-center items-center font-bold py-1'>
                        {
                            user ? (
                                <div>
                                    <div className='font-bold text-xl'>{user.username}</div>
                                    {/* <Link to='/logout'>Logout</Link> */}
                                </div>
                            ) : (
                                <Link to='/login' className='bg-[#272727]'>
                                    Login
                                </Link>
                            )
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar