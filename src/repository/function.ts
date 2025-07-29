'use server'
import axios from "axios";


export const uploadImage = async (file: File, token: string) => {
    const formData = new FormData();
    formData.append("image", file);
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL_API;

    try {
        const response = await axios.post(`${baseURL}/analyses/analyze`, formData, {
            headers : {
                "Content-Type" : "multipart/form-data",
                "Authorization" : `Bearer ${token}`
            }
        })
        return response.data.payload;
    } catch (err){
        console.log("upload Failed" + err);
        throw err;
    }
}

export const getHistoryAnalyze = async (currentPage : number, token: string, limit: number) => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL_API;
    
    try {
        const response = await axios.get(`${baseURL}/me/analyses`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }, 
            params: {
                page: currentPage,
                limit: limit || 10, // Default to 10 if limit is not provided
            }
        })
        return response.data;
    } catch (err) {
        console.log("Get History Analyze Failed" + err);
        throw err;
    }
} 

