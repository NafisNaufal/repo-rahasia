import React from 'react'
import Navbar from '@/shared/partials/navbar/index'
import Footer from '@/shared/partials/footer/index'

const index = ({children} : {children: React.ReactNode}) => {
    return (
        <div className=' min-h-screen relative overflow-hidden w-full h-full bg-background flex flex-col items-center justify-between gap-4 p-5'>
            {/* Navbar */}
            <Navbar />
            {/* Isi */}
            <div className='min-h-[60vh] w-full flex items-center justify-start flex-col'>
                {children}
            </div>
            {/* Footer */}
            <Footer />
        </div>
    )
}

export default index
