import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../globalState/userState';
import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const { setUser } = useContext(UserContext);
    const [islogin, setIslogin] = useState(true);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();
    const [loginUser, setLoginUser] = useState({
        username: '',
        password: ''
    });

    const [signupUser, setSignupUser] = useState({
        username: '',
        password: '',
        fullname: '',
        email: ''
    });

    const baseUrl = 'http://localhost:7000/api/v1';


    const onChangeLogin = (e) => {
        const { name, value } = e.target;
        setLoginUser({ ...loginUser, [name]: value });
    };

    const onChangeSign = (e) => {
        const { name, value } = e.target;
        setSignupUser({ ...signupUser, [name]: value });
    };

    const onProfileChange = (e) => {
        const file = e.target.files[0];
        setProfile(file);
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        // console.log(loginUser);

        try {
            const res = await axios.post(`${baseUrl}/users/login`, {
                username: loginUser.username,
                password: loginUser.password
            },
                {
                    withCredentials: true
                }
            );



            // console.log(res.data);
            console.log(res.data.message.user);
            toast('Notification!', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            setUser(res.data.message.user)
            console.log(res.data.message.user)
            localStorage.setItem('user', JSON.stringify(res.data.message.user));

            navigate('/')
        } catch (error) {
            console.log(error.message);
            alert("Please enter correct username and password");
        }
    };

    const handleSign = async (e) => {
        e.preventDefault();
        console.log(signupUser);
        console.log(profile);
        try {
            const res = await axios.post(`${baseUrl}/users/register`, {
                username: signupUser.username,
                password: signupUser.password,
                fullname: signupUser.fullname,
                email: signupUser.email,
                avatar: profile
            });

            toast('Account Created Successfully, Please login', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                progressStyle: { backgroundColor: 'red', color: 'black', }
            });

            console.log(res.data);
            // navigate('/')
        } catch (error) {
            console.log(error.message);
            alert("Please enter correct username and password");
        }
    };


    return (
        <>
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
            <div className='Login w-full h-full  my-auto mx-auto'>

                <div className='mx-auto w-[30vw] h-[60vh] flex flex-col justify-center items-center px-7 '>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className={`LoginForm flex flex-col w-full items-center 
                        ${islogin ? "block" : "hidden"}
                    `}>
                        <div className='text-xl font-bold mb-7'>Login</div>

                        <input
                            type="text"
                            placeholder='username'
                            name='username'
                            className='p-3 w-full px-6 rounded-3xl outline-none border border-[#303030]'
                            onChange={onChangeLogin}
                            required
                        />

                        <input
                            type="password"
                            placeholder='Password'
                            name='password'
                            className='p-3 px-6 w-full mt-3 rounded-3xl outline-none border border-[#303030]'
                            onChange={onChangeLogin}
                            required
                        />

                        <button type='submit' className='bg-red-600 text-white p-3 w-full rounded-3xl mt-3'>Login</button>
                        <div className='' onClick={() => setIslogin(!islogin)}>
                            Don't have an account??
                            <span className='text-red-600'>Signup</span>
                        </div>
                    </form>

                    {/* Signup Form */}
                    <form onSubmit={handleSign} className={`SignupForm flex flex-col w-full items-center
                        ${islogin ? "hidden" : ""}    
                    `}>
                        <div className='text-xl font-bold mb-7'>Signup</div>

                        <input
                            type="text"
                            placeholder='Username'
                            name='username'
                            className='p-3 px-6 w-full rounded-3xl outline-none border border-[#303030] mb-3'
                            onChange={onChangeSign}
                            required
                        />

                        <input
                            type="text"
                            placeholder='Full Name'
                            name='fullname'
                            className='p-3 px-6 w-full rounded-3xl outline-none border border-[#303030] mb-3'
                            onChange={onChangeSign}
                            required
                        />

                        <input
                            type="text"
                            placeholder='Email'
                            name='email'
                            className='p-3 px-6 w-full rounded-3xl outline-none border border-[#303030] mb-3'
                            onChange={onChangeSign}
                            required
                        />

                        <input
                            type="password"
                            placeholder='Password'
                            name='password'
                            className='p-3 px-6 w-full mb-3 rounded-3xl outline-none border border-[#303030]'
                            onChange={onChangeSign}
                            required
                        />

                        <div className='w-full px-6 text-sm text-gray-500 font-semibold'>
                            Profile Photo
                            <input
                                id='Profile'
                                type="file"
                                name='avatar'
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-red-700 hover:file:bg-red-100 mt-1"
                                onChange={onProfileChange}  // Handle profile change
                                required
                            />
                        </div>

                        <button type='submit' className='bg-red-600 mt-4 text-white p-3 w-full rounded-3xl'>
                            Create Account
                        </button>
                        <div className='' onClick={() => setIslogin(!islogin)}>
                            Already have an account??
                            <span className='text-red-600'>Login</span>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
};

export default Login;
