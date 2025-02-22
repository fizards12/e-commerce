import { v2 as cloudinary, UploadApiOptions, UploadApiResponse } from "cloudinary";
import multer, { memoryStorage } from "multer";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from "../env";
import { ErrorGenerator } from "./error";
import { Errors } from "../enum/errors";

const storage = memoryStorage();
export const upload = multer({ storage });

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });

export const uploadImage = async (options: UploadApiOptions,file: Express.Multer.File)=>{
    return await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader.upload_stream(options, (error, result) => {
            if (error) {
                reject(new ErrorGenerator(null,null,error));
            }
            resolve(result as UploadApiResponse);
        }).end(file.buffer);
    });
};
