import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload an image
export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        console.log(response);
        
        // file has been uploaded successfully
        console.log("file uploaded on cloudinary", response.url);
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath) // removes the temporary file saved on the server as upload got failed
        return null
    }
}
