const cloudinary = require("cloudinary").v2;


exports.uploadImage = async (files,folder, height, quality) =>{
    const images = files;
    console.log("Total Image",images)
    const options = {folder};
    if(height) {
        options.height = height;
    }
    if(quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";

      

        var result = []
        console.log("result lenght...",images.length)
        if(images.length === undefined){
           return await cloudinary.uploader.upload(files.tempFilePath,options)
        }
        const uploadImages = async () => {
          for (let image in images){
             var raja = await cloudinary.uploader.upload(images[image].tempFilePath,options);
             result.push(raja.secure_url)
          }
        }
         await uploadImages();
         console.log("result",result)
         return result
}       