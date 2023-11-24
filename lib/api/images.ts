import FD from "form-data"
import axios from "axios"
const pubAPI = process.env.NEXT_PUBLIC_API_URL
export async function upload(file: File) {
    const fd = new FD();
    fd.append('file', file, file.name);
    console.log(pubAPI)
    try {
        const response = await axios.post(pubAPI + "/images/upload", fd, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${(fd as any)._boundary}`,
                "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
            }
        })
        return response.data
    } catch (error) {
        return Promise.reject(error)
    }
}