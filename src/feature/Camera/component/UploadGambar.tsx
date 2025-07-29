'use client'
import React, { useRef, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import UploadIcon from '@mui/icons-material/Upload';
import  Button  from '@/shared/Button/Button';
import Image from 'next/image';
import {uploadImage} from '@/repository/function';

type UploadGambarProps = {
    onFeedback : (feedback: string | null) => void;
    onLoading : (loading: boolean) => void;
}

const Page = ({
    onFeedback,
    onLoading
}: UploadGambarProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isValidType, setIsValidType] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const openFileDialog = () => {
        if (uploadedFile) return;
        fileInputRef.current?.click();
    };

    const handleFile = (file: File) => {
        const maxSizeFile = 1 * 1024 * 1024; // 1 MB
        if (!file.type.startsWith('image/')) {
            setError('Invalid file type. Please upload an Image file.');
            setPreviewUrl(null);
            setUploadedFile(null);
            setIsValidType(false);
            return;
        } else if (file.size > maxSizeFile) {
            setError('File size exceeds 1 MB. Please upload a smaller file.');
            setPreviewUrl(null);
            setUploadedFile(null);
            setIsValidType(false);
            return;
        } else {
            setError(null);
            setPreviewUrl(URL.createObjectURL(file));
            setUploadedFile(file);
            setIsValidType(true);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        setIsDragging(true);
        e.preventDefault();
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        setIsDragging(true);
        e.preventDefault();
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        setIsDragging(false);
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files.length === 0) return;
        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    const handleDelete = () => {
        setPreviewUrl(null);
        setUploadedFile(null);
        setError(null);
        setIsValidType(false);
        setIsDragging(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    const handleUploadImage = async () => {
        if (previewUrl) {
            onLoading(true);
            const token = localStorage.getItem("token");
            try {
                const response = await uploadImage(uploadedFile as File, token as string);
                onFeedback(response.feedback);
            } catch (error) {
                onFeedback("Upload failed. Please try again.");
            } finally {
                onLoading(false);
            }
        }
    }

    return (
        <div className='z-20 w-[60%] h-[30%] flex flex-col items-center justify-center gap-5'>
            <div 
                className={`w-[85%] h-[25%] border-2 rounded-lg p-5 flex flex-col items-center justify-center flex-wrap cursor-pointer ${
                    error ? 'border-red-600' : 'border-primary-100'
                } ${uploadedFile ? 'pointer-events-none' : ''} ${isDragging ? 'bg-blue-100 text-white' : ''}`}
                onClick={openFileDialog}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
            >
            {previewUrl ? (
                isValidType ? (
                    <Image
                        src={previewUrl}
                        alt="Preview"
                        width={100}
                        height={100}
                        className="object-cover rounded-lg mb-2 w-1/2"
                    />
                ) : (
                    <>
                        <CloseIcon />
                        <p className="text-sm text-gray-500 mt-2">{error}</p>
                    </>
                )
            ) : (
                !isDragging && !error  ?  (
                    <p className="text-sm text-gray-500">Upload Image Food Waste Here or Drag and Drop</p>
                ) : (
                    <>
                        <UploadIcon className="text-gray-500" />
                        <p className="text-sm text-gray-500">drop a Image Food Waste file here </p>
                    </>
                )
            )}
            <input 
                type="file" 
                ref={fileInputRef}
                className="hidden"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleChange}
            /> 
            {error && !isDragging && (
                <p className="text-sm text-red-600 mt-2">{error}</p>
            )}
            </div>
            {previewUrl && isValidType && !error && uploadedFile && (
                <div className='flex items-center justify-center w-full gap-4'>
                    <Button
                        onClick={handleDelete}
                        label="Delete"
                        type='reset'
                    />
                    <Button
                        onClick={handleUploadImage}
                        label="Upload"
                        type='submit'
                    />
                </div>
            )}
        </div>
    );
};

export default Page;
