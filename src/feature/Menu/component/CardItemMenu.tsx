'use client'
import React from 'react'
import Image from 'next/image'
import Clock from '@/Assets/Menu/icons/mingcute_time-line.png'
import Human from '@/Assets/Menu/icons/Vector.png'
import { CardItemsMenu } from '@/data/type'
import GreenClock from '@/Assets/Menu/icons/mingcute_time-line (1).png'
import GreenHuman from '@/Assets/Menu/icons/Vector (1).png'
import { useRouter } from 'next/navigation'

const CardItemMenu = ({
    id,
    title,
    description,
    image,
    slug,
    time,
    people
}: CardItemsMenu) => {

    const router = useRouter();
    const handleClick = () => {
        if (slug) {
            router.push(`/Menu/${slug}`);
        }
    }
    return (
        <div 
            className={`z-10 w-90 h-115 bg-primary-100 ${(id !== undefined && id % 2 === 0) ? 'bg-white' : ''} rounded-xl flex flex-col items-center justify-start gap-2 pt-8`}
            onClick={handleClick}
            >
            <div className='w-xs h-xs rounded-lg flex items-center justify-center'>
                <Image src={image} alt="Gulai Kambing" width={500} height={500} className='w-full h-full object-cover rounded-lg' />
            </div>
            <div className='w-full flex items-center justify-center px-5 py-1'>
                <h1 className={`text-2xl font-Inter font-semibold text-background text-center ${id !== undefined && id % 2 === 0 ? 'text-primary-100' : ''}`}>{title}</h1>
            </div>
            <div className='w-full px-5 py-1 h-38'>
                <p className={`text-base font-Inter font-medium text-background text-justify ${id !== undefined && id % 2 === 0 ? 'text-primary-100' : ''}`}>{description} </p>
            </div>
            <div className='z-10 w-full px-5 py-1 flex items-center justify-start gap-4'>
                <div className='flex items-center justify-center gap-2'>
                    {id !== undefined && id % 2 === 0 ? (
                        <Image src={GreenClock} alt="Clock Icon" width={200} height={200} className='w-3.5 h-3.5 object-cover' />
                    ) : (
                        <Image src={Clock} alt="Clock Icon" width={200} height={200} className='w-3.5 h-3.5 object-cover' />
                    )}
                    <p className={`text-base font-Inter font-semibold text-background ${id !== undefined && id % 2 === 0 ? 'text-primary-100' : ''}`}>{time}</p>
                </div>
                <div className='flex items-center justify-center gap-2'>
                    {id !== undefined && id % 2 === 0 ? (
                        <Image src={GreenHuman} alt="Human Icon" width={200} height={200} className='w-3.5 h-3.5 object-cover' />
                    ) : (
                        <Image src={Human} alt="Human Icon" width={200} height={200} className='w-3.5 h-3.5 object-cover' />
                    )}
                    <p className={`text-base font-Inter font-semibold text-background ${id !== undefined && id % 2 === 0 ? 'text-primary-100' : ''}`}>{people}</p>
                </div>
            </div>
        </div>
    )
}

export default CardItemMenu
