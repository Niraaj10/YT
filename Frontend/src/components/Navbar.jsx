import React, { useContext } from 'react'
import { TfiTwitterAlt } from "react-icons/tfi";
import { RiSearch2Line } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../globalState/userState';
import { BiLogOut } from 'react-icons/bi';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';






const Navbar = () => {
    const { user, setUser } = useContext(UserContext);
    const baseUrl = 'http://localhost:7000/api/v1';
    const navigate = useNavigate(); 


    const logout = async () => {
        try {
            const res = await axios.post(`${baseUrl}/users/logout`, {}, { withCredentials: true })

            toast('Logout Successfully', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                progressStyle: { backgroundColor: 'red', }
            });
            
            
            setUser(null)

            Cookies.remove('user');
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
          
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');

            console.log(res)
            navigate('/')

        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <>
            <div className='Navbar p-4  '>
                {/* Navbar */}

                <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />



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


                    {
                        user ? (
                            <div className='hidden md:flex lg:flex justify-center items-center gap-2'>

                                <div className='Login bg-[#272727] border border-[#303030] rounded-3xl px-6 flex justify-center items-center font-bold py-1'>
                                    <div>
                                        <div className=' bg-[#272727]'>{user.username}</div>
                                        {/* <Link to='/logout'>Logout</Link> */}
                                    </div>
                                </div>

                                <div className='Logout' onClick={logout}>
                                    <BiLogOut size={22} />
                                </div>
                            </div>

                        ) : (
                            <div className='hidden md:flex lg:flex Login bg-[#272727] border border-[#303030] rounded-3xl px-6  justify-center items-center font-bold py-1'>
                                <Link to='/login' className='bg-[#272727]'>
                                    Login
                                </Link>
                            </div>
                        )
                    }


                </div>
            </div>
        </>
    )
}

export default Navbar