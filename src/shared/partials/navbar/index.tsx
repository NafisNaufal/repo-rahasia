'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Logo from '@/Assets/Navbar/images/Logo 1.png'
import { FcGoogle } from "react-icons/fc";
import { usePathname, useRouter, useSearchParams} from 'next/navigation';
import Link from 'next/link';
import { BsDot } from "react-icons/bs";
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const index = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [userData, setUserData] = useState<{
        email: string,
        id: string,
        name: string,
    }>({
        email: '',
        id: '',
        name: '',
    });
    const [token, setToken] = useState<string | null>(null);

    const isActive = (path:string) => {
        return pathname === path;
    }

    useEffect(() => {
        const code = searchParams.get('code');
        const state = searchParams.get('state');

        const handleOAuthCallback = async () => {
            const baseURL = process.env.NEXT_PUBLIC_BASE_URL_API;

            try {
                const response = await axios.post(`${baseURL}/auth/google/oauth/callback`, {
                    code,
                    state
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                const token = response.data.payload.token;
                if (token) {
                    localStorage.setItem("token", token);
                    window.location.href = "/Home";
                } else {
                    console.log("Token not found in response.");
                    throw new Error("Token not found");
                }
            } catch (err) {
                console.error("OAuth callback failed:", err);
                throw err;
            }
        }

        if (code && state) {
            handleOAuthCallback().catch((err) => console.log("Error handling OAuth callback:", err));
        }
    },[])

    useEffect(() => {
        const token = localStorage.getItem("token");
        const getUserData = async () => {
            if (token) {
            const baseURL = process.env.NEXT_PUBLIC_BASE_URL_API;
                try {
                    const response = await axios.get(`${baseURL}/me`, {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    })
                    setUserData({
                        email: response.data.payload.email,
                        id: response.data.payload.id,
                        name: response.data.payload.name,
                    });
                } catch (err) {
                    if (axios.isAxiosError(err)) {
                        if (err.response?.status === 401) {
                            localStorage.removeItem("token");
                            setToken(null);
                            setUserData({
                                email: '',
                                id: '',
                                name: '',
                            });
                            window.location.href = '/Home';
                        }
                    }
                }
            }
        }
        getUserData().catch((err) => console.log("Error fetching user data:", err));
    },[])

    const handleLoginWithGoogle = async () => {
        try {
            const baseURL = process.env.NEXT_PUBLIC_BASE_URL_API;
            const response = await axios.get(`${baseURL}/auth/google/oauth/redirect`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const redirectUrl = response.data.payload.redirect_url;

            if (redirectUrl) {
                window.location.href = redirectUrl;
            } else {
                console.log("Redirect URL not found in response.");
            }
        } catch (err) {
            console.error("Login with Google failed:", err);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        setToken(token);
    }, []);

    const handleToCamera = async () => {        
        if (!token) {
            await alert("Please login to access the Camera feature.");
            window.location.href = '/Home';
            return;
        }
    }

    const handleLogOut = async () => {
        const confirmLogout = await window.confirm("Are you sure you want to logout?");
        if (token && confirmLogout) {
            localStorage.removeItem("token");
            setToken(null);
            setUserData({
                email: '',
                id: '',
                name: '',
            });
            window.location.href = '/Home';
        }
    }

    return (
        <nav className='w-full flex justify-between items-center p-5 '>
            <Link href={'/Home'} className='font-Poppins flex items-center justify-start lg:justify-center w-3/4 md:w-1/4 gap-4'>
                <div className='w-1/6 h-1/6 hidden xs:inline-block'>
                    <Image src={Logo} alt="Logo" width={50} height={50} className='w-full h-full object-cover' />
                </div>
                <h1 className='text-2xl font-bold text-foreground'>Save <span className='text-primary-100'>Bite</span></h1>
            </Link>
            <div className='hidden w-1/4 xl:flex items-center justify-center gap-4'>
                <Link href={'/Home'} className={`relative font-Inter font-semibold text-lg hover:text-primary-100 transition-colors duration-300 ease-in-out flex flex-col items-center justify-center gap-0.5 ${isActive('/Home') ? 'text-primary-100' : ''}`}>
                    <p>Home</p>
                    {isActive('/Home') && <BsDot className='text-primary-100 text-2xl absolute -bottom-5' />}
                </Link>
                <Link href={'/Camera'} className={`relative font-Inter font-semibold text-lg hover:text-primary-100 transition-colors duration-300 ease-in-out flex flex-col items-center justify-center gap-3 ${isActive('/Camera') ? 'text-primary-100' : ''}`} onClick={handleToCamera}>
                    <p>Camera</p>
                    {isActive(`${!token ? '/Home' : '/Camera'}`) && token && (<BsDot className='text-primary-100 text-2xl absolute -bottom-5' />)}
                </Link>
                <Link href={'/Menu'} className={`relative font-Inter font-semibold text-lg hover:text-primary-100 transition-colors duration-300 ease-in-out flex flex-col items-center justify-center gap-3 ${isActive('/Menu') ? 'text-primary-100' : ''}`}>
                    <p>Menu</p>
                    {isActive('/Menu') && <BsDot className='text-primary-100 text-2xl absolute -bottom-5' />}
                </Link>
            </div>
            <div className='w-1/4 flex items-center justify-center'>
                <button 
                    onClick={!token ? handleLoginWithGoogle : handleLogOut}
                    className='hidden w-[40%] bg-transparent border border-primary-100 text-primary-100 px-2 py-2 rounded-full font-Inter font-semibold xl:flex items-center justify-center gap-3 hover:bg-primary-100 hover:text-white transition-colors duration-300 ease-in-out cursor-pointer'
                    type='button'
                    >
                    {token ? (
                        <>
                            <p className='font-Inter text-base font-semibold'>{userData.name}</p>
                        </>
                    ) : (
                        <>
                            <FcGoogle className='inline-block ml-2' />
                            <p className='font-Inter text-base font-semibold'>Login</p>
                        </>
                    )}
                </button>
                <button
                    className='block xl:hidden'
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {!isOpen ? (
                        <MenuIcon className='w-30 h-30 text-primary-100 cursor-pointer' fontSize='large'/>
                    ) : (
                        <CloseIcon className='w-30 h-30 text-primary-100 cursor-pointer' fontSize='large'/>
                    )}
                </button>                
            </div>
            {isOpen && (
                <div className='absolute top-21 right-5 bg-white shadow-lg rounded-lg p-5 w-48 z-50'>
                    <ul className='flex flex-col items-start gap-3'>
                        <li>
                            <Link href={'/Home'} className={`font-Inter font-semibold text-lg hover:text-primary-100 transition-colors duration-300 ease-in-out ${isActive('/Home') ? 'text-primary-100' : ''}`}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href={`${!token ? '/Home' : '/Camera'}`} onClick={handleToCamera} className={`font-Inter font-semibold text-lg hover:text-primary-100 transition-colors duration-300 ease-in-out ${isActive('/Camera') ? 'text-primary-100' : ''}`}>
                                Camera
                            </Link>
                        </li>
                        <li>
                            <Link href={'/Menu'} className={`font-Inter font-semibold text-lg hover:text-primary-100 transition-colors duration-300 ease-in-out ${isActive('/Menu') ? 'text-primary-100' : ''}`}>
                                Menu
                            </Link>
                        </li>
                        <li>
                            <button 
                                onClick={!token ? handleLoginWithGoogle : handleLogOut}
                                className='w-full bg-transparent border border-primary-100 text-primary-100 px-4 py-2 rounded-full font-Inter font-semibold flex items-center justify-center gap-3 hover:bg-primary-100 hover:text-white transition-colors duration-300 ease-in-out cursor-pointer'
                                type='button'
                            >
                                {token ? (
                                    <p className='font-Inter text-base font-semibold'>{userData.name}</p>
                                ) : (
                                    <p className='font-Inter text-base font-semibold'>Login</p>
                                )}
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    )
}

export default index
