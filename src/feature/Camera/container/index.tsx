'use client'
import Camera from '@/feature/Camera/component/Camera'
import { useState } from 'react'
import RadioInput from '@/shared/Button/RadioInput'
import UploadGambar from '@/feature/Camera/component/UploadGambar'
import { useSearchParams } from 'next/navigation'



const Index = () => {
    const [feedback, setFeedback] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [value, setValue] = useState<'Camera' | 'Upload Gambar'>('Camera')
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value as 'Camera' | 'Upload Gambar');
    };

    return (
        <div className='w-full flex items-center justify-center flex-col gap-5 p-7 '>
            <div className='w-1/2 flex items-center justify-center '>
                <h1 className='text-5xl font-Inter font-semibold text-wrap text-center'><span className='text-primary-100'>Let’s Analyze</span> Your Food Waste</h1>
            </div>
            <RadioInput value={value} onChange={handleChange} page={currentPage} limit={limit} />
            <div className='w-full flex items-center justify-center'>
                {value === 'Camera' ? (
                    <Camera onFeedback={setFeedback} onLoading={setIsLoading} />
                ) : (
                    <UploadGambar onFeedback={setFeedback} onLoading={setIsLoading}/>
                )}
            </div>
            <div className={`w-[51%] flex items-center justify-center ${feedback && 'bg-primary-100 p-10 rounded-lg'}`} >
                <h1 className='text-lg font-Inter font-semibold text-wrap text-center'>{isLoading && !feedback ? <span className='text-primary-100'> Loading...</span> : <span className='text-primary-100 html-feedback' dangerouslySetInnerHTML={{ __html: feedback as string}} />} </h1>
            </div>
        </div>
    )
}

export default Index
