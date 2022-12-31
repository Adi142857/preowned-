import axios from 'axios';


const imageUploadService = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'dclsqfhd');
    const url = `https://api.cloudinary.com/v1_1/${process.env.VUE_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;

    try {
        const { data } = await axios.post(url, formData)
        return data.secure_url;
    } catch (error) {
        console.log(error);
    }
}

export default imageUploadService;