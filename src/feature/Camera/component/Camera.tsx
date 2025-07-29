'use client'
import Image from 'next/image';
import React, {useState, useRef, useEffect} from 'react'
import Webcam from 'react-webcam'
import CameraIconsOn from '@/Assets/Camera/icons/solar_camera-bold.png'
import CameraIconsOff from '@/Assets/Camera/icons/solar_camera-bold (1).png'
import CameraIsUnAvailable from '@/Assets/Camera/images/solar_camera-bold (2).png'
import {uploadImage} from '@/repository/function'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
type CameraProps = {
    onFeedback: (feedback : string | null) => void;
    onLoading?: (loading: boolean) => void;
}

const index = ({onFeedback, onLoading} : CameraProps) => {

    const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");

    const videoContraints = {
        width: 600,
        height: 285.68,
        facingMode: facingMode
    }

    const webCamRef = useRef<Webcam>(null);
    const webCamContainerRef = useRef<HTMLDivElement>(null);
    const [webCamWidth, setWebCamWidth] = useState<number>(0)
    const [stream, setStream] = useState<MediaStream | null>(null)
    const [isCameraOn, setIsCameraOn] = useState<boolean>(false);
    const [permissionDenied, setPermissionDenied] = useState<boolean>(false)
    const [images, setImages] = useState<string[]>([]);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [flash, setFlash] = useState<boolean>(false);

    useEffect(() => {
        if (!webCamContainerRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const width = entry.contentRect.width;
                setWebCamWidth(width);
            }
        });

        observer.observe(webCamContainerRef.current);

        return () => observer.disconnect();
    },[webCamWidth]);

    useEffect(() => {
        const openCamera = async () => {
            if (isCameraOn) {
                if (stream) {
                    stream.getTracks().forEach((track) => track.stop());
                    setStream(null);
                } else {
                    try {
                        const mediaStream = await navigator.mediaDevices.getUserMedia({
                            video : {
                                facingMode: facingMode,
                                width: videoContraints.width,
                                height: videoContraints.height,
                            }
                        })

                        setStream(mediaStream);
                        setPermissionDenied(false);

                        if (webCamRef.current) {
                            webCamRef.current.video!.srcObject = mediaStream;
                        }

                    } catch (err) {
                        console.log('Camera', err)
                        setPermissionDenied(true);
                    }
                }
            } else {
                if (stream) {
                    stream.getTracks().forEach((track) => track.stop())
                    setStream(null);
                }
            }
        }

        openCamera();
    }, [isCameraOn, facingMode]);

    const toggleCamera = () => {
        setIsCameraOn(!isCameraOn);
        setCapturedImage(null);
    }


    const base64ToFile = (base64: string, filename: string) : File => {
        const arr = base64.split(',');
        const mimeMatch = arr[0].match(/:(.*?);/);
        const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    const captureImage = async () => {
        setFlash(true);

        await new Promise((res) => setTimeout(res, 1000));

        if (webCamRef.current && webCamRef.current.getScreenshot) {
            const imageSrc = webCamRef.current?.getScreenshot();
            if (imageSrc) {
                setImages([...images, imageSrc]);
                setCapturedImage(imageSrc);

                const file = base64ToFile(imageSrc, 'capture.jpg');
                const token = localStorage.getItem("token");

                if (onLoading) onLoading(true);
                try {
                    const result = await uploadImage(file as File, token as string).catch((err) => console.log("Upload Failed ", err));
                    onFeedback(result.feedback);
                } catch (err) {
                    onFeedback("Upload failed. Please try again.");
                } finally {
                    if (onLoading) onLoading(false);
                }
            }
        }

        setTimeout(() => setFlash(false), 1000);
    }

    return (
        <div className='z-10 relative w-[40%] p-2 xs:py-4 xs:px-8 h-auto flex flex-col items-center justify-center gap-3 rounded-lg bg-primary-100 '>
            <h1 className='text-white font-Inter font-semibold text-2xl '>Food Waste</h1>
            {permissionDenied ? (
                <h1 className='text-white font-Inter font-semibold text-2xl self-center'>Camera Permission Denied</h1>
            ) : capturedImage  ? (
                <>
                    <Image
                        src={capturedImage}
                        alt="Captured"
                        width={videoContraints.width}
                        height={videoContraints.height}
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                        onClick={toggleCamera}
                        className="absolute -top-4 -left-7 bg-gradient-to-br from-[#D5D5D5] to-[#FFFFFF] p-2 rounded-xl shadow cursor-pointer"
                    >
                        <Image
                            src={CameraIconsOff}
                            alt="Camera Icon"
                            width={50}
                            height={50}
                            className="w-9 h-9 object-cover"
                        />
                    </button>
                </>
            ) : isCameraOn ? (
                <>
                    <div ref={webCamContainerRef} className='w-full relative'>
                        {flash && (
                            <div className={`absolute inset-0 ${`w-[${videoContraints.width}px] h-[${videoContraints.height}px]`} bg-white opacity-80 animate-pulse z-50 rounded-lg pointer-events-none`} />
                        )}
                        <Webcam
                            ref={webCamRef}
                            audio={false}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoContraints}
                            className='w-full h-full object-cover rounded-lg'
                        />
                    </div>
                    <>
                        <button
                            onClick={toggleCamera}
                            className="absolute -top-4 -left-7 bg-gradient-to-br from-[#D5D5D5] to-[#FFFFFF] p-2 rounded-xl shadow cursor-pointer"
                        >
                            <Image
                                src={CameraIconsOn}
                                alt="Camera Icon"
                                width={50}
                                height={50}
                                className="w-9 h-9 object-cover"
                            />
                        </button>
                    </>
                </>
            ) : (
                <div className='w-full flex items-center justify-center'>
                    <button
                        onClick={toggleCamera}
                        className="absolute -top-4 -left-7 bg-gradient-to-br from-[#D5D5D5] to-[#FFFFFF] p-2 rounded-xl shadow cursor-pointer"
                    >
                        <Image
                            src={CameraIconsOff}
                            alt="Camera Icon"
                            width={50}
                            height={50}
                            className="w-9 h-9 object-cover"
                        />
                    </button>
                    <div className='w-3/4 flex items-center justify-center gap-6'>
                        <Image
                            src={CameraIsUnAvailable}
                            alt="Camera Unavailable"
                            width={200}
                            height={200}
                            className='w-1/4 h-auto object-cover hidden md:inline-block'
                        />
                        <h1 className='text-white font-Inter font-semibold text-xl w-full leading-5 max-xs:text-xs'>Camera Is Off <br /> <span className='text-xs font-semibold leading-0'>Please press camera button on right corner</span></h1>
                    </div>
                </div>
            )}
            {isCameraOn && (
                <div className='w-1/4 flex items-center justify-between '>
                    <button
                        onClick={captureImage}
                        className="w-16 h-16 max-xs:w-5 max-xs-h-5 bg-white text-primary-100 rounded-full shadow cursor-pointer flex items-center justify-center px-5"
                    >
                        <CameraAltIcon />
                    </button>
                    <button
                        onClick={() => setFacingMode((prev) => (prev === "user" ? "environment" : "user"))}
                        className='w-16 h-16 bg-white text-primary-100 rounded-full shadow cursor-pointer flex items-center justify-center px-5'
                    >
                        <FlipCameraAndroidIcon fontSize='medium'/>
                    </button>
                </div>
            )}
        </div>
    )
}

export default index
