'use client';
import { LuArrowRight } from "react-icons/lu";
import { BsChatLeftText } from "react-icons/bs";
import HiasanPulau from '@/Assets/Home/images/image-removebg-preview (1) 1.png'
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


const index = () => {
    const [token, setToken] = useState<string | null>(null);
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
    return (
        <div className="h-full w-full flex flex-col items-center relative">
            <div className="flex flex-col items-center justify-center w-3/4 p-4 gap-1">
                <h1 className="max-xs:text-3xl text-4xl lg:text-5xl font-Inter font-semibold text-center text-foreground">
                    <span className="text-primary-100">Visit Us </span>to Check Your Food Waste  
                </h1>
                <h2 className="text-base lg:text-2xl font-Inter font-semibold text-center text-foreground">
                    Transforming Leftovers, <span className="text-primary-100">Reducing Waste</span>
                </h2>
                <div className="flex items-center justify-center w-full mt-4 gap-4">
                    <Link href={`${!token ? '/Home' : '/Camera'}`} onClick={handleToCamera} className=" bg-[linear-gradient(to_right,#3C6448,#578B50)] text-white px-5 py-2 xs:px-6 xs:py-2 rounded-full flex items-center gap-3 hover:bg-none hover:text-primary-100 hover:border-2 hover:border-primary-100 transition-colors duration-300 ease-in-out cursor-pointer text-xs xs:text-lg">
                        Get Started
                        <LuArrowRight className="hidden sm:inline-block"/>
                    </Link>
                    <Link href={'https://wa.me/6282241982353'} className="bg-transparent border-2 border-primary-100 text-primary-100 px-5 py-2 xs:px-6 xs:py-2 rounded-full flex items-center text-left gap-3 hover:bg-primary-100 hover:text-background transition-colors duration-300 ease-in-out cursor-pointer text-xs xs:text-lg">
                        <BsChatLeftText className="hidden sm:inline-block"/>
                        Contact Us
                    </Link>
                </div>
            </div>
            <motion.div
                className="z-10 absolute top-[90%] left-1/2 transform -translate-x-1/2 overflow-hidden w-96 h-96 lg:w-140 lg:h-140"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="w-full h-full drop-shadow-2xl ">
                    <Image
                        src={HiasanPulau}
                        alt="Hiasan Pulau"
                        width={550}
                        height={550}
                        className="object-cover w-full h-full"
                    />
                </div>
            </motion.div>
        </div>
    )
}

export default index
