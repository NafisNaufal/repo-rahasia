'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {getHistoryAnalyze} from '@/repository/function'

interface HistoryData {
    detected_items?: string[];
    usable_ingredients?: string[];
    unused_ingredients?: string[];
    feedback: string;
    image_url?: string;
}

const index = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [data, setData] = useState<HistoryData[] | null>(null);
    const currentPage = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert("Please login to access this page.");
                    return;
                } else {
                    const data = await getHistoryAnalyze(currentPage, token, limit);
                    if (!data || !data.payload || !Array.isArray(data.payload) || data.payload.length === 0) {
                        setError("No history data found.");
                        setData(null);
                        setIsLoading(false);
                    } else if (currentPage > data.meta.page) {
                        setError("No more history data available.");
                        setData([]);
                    } else {
                        setData(data.payload);
                    }
                }
            } catch (err) {
                console.log("Error fetching history data:", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData().catch((err) => {
            console.error("Failed to fetch history data:", err);
        });
        console.log("currentPage:", currentPage);
        console.log("limit:", limit);
    },[currentPage, limit])

    return (
        <div className={`z-10 w-[51%] flex flex-col items-center justify-center bg-primary-100 ${data && ' p-10 rounded-lg'}`}>
            {isLoading ? (
                <span className='text-white font-Inter font-semibold text-xl'>Loading...</span>
            ) : error ? (
                <span className='text-white font-Inter font-semibold text-xl'>{error}</span>
            ) : (
                data?.map((item, index) => (
                    <div key={index} className='w-full flex flex-col items-center mb-6'>
                        {item.image_url && (
                            <img
                                src={item.image_url}
                                alt={`History Image ${index + 1}`}
                                width={500}
                                height={300}
                                className="object-cover rounded-lg mb-3"
                            />
                        )}
                        <div
                            className="text-primary-100 text-lg font-Inter font-semibold text-wrap text-center html-feedback"
                            dangerouslySetInnerHTML={{ __html: item.feedback }}
                        />
                        <hr className='w-full h-1 bg-background mt-5'/>
                    </div>
                ))
            )}
            <div className='w-full flex items-center justify-center mt-5 gap-5'>
                
                <button 
                    className={`px-4 py-2 bg-background text-primary-100 font-Inter font-semibold rounded-lg cursor-pointer hover:bg-primary-200 hover:text-white transition-colors duration-300 ease-in-out ${currentPage <= 1 || currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => {
                        const nextPage = currentPage - 1;
                        router.push(`?page=${nextPage}&limit=${limit}`);
                    }}
                    disabled={currentPage < 1 || currentPage === 1}
                >
                        prev
                </button>
                <p className='text-lg font-Inter font-semibold text-wrap text-center text-white'>{currentPage}</p>
                <button 
                    className='px-4 py-2 bg-background text-primary-100 font-Inter font-semibold rounded-lg cursor-pointer hover:bg-primary-200 hover:text-white transition-colors duration-300 ease-in-out'
                    onClick={() => {
                        const nextPage = currentPage + 1;
                        router.push(`?page=${nextPage}&limit=${limit}`);
                    }}
                >
                        Next
                </button>
            </div>
        </div>
    )
}

export default index
