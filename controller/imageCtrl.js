const cloudinary = require('../middleware/cloud')
const fs = require("fs")

const removeTemp = (path) => {
    fs.unlinkSync(path)
}

const imageCtrl = {
    uploadProduct : async (req, res)=>{
        try{
            // res.json({files: req.files})
            // res.json("image uploaded")
            if(!req.files || Object.keys(req.files).length===0)
            return res.status(400).json({msg: "No files were uploded"})

            const file = req.files.productImg;
            // res.json({files : file})

            //validate the file size
            if(file.size > 1 * 1024 * 1024) {
                removeTemp(file.tempFilePath)
                return res.status(400).json({msg: "File size must be less than 5MB."})
            }
            // validate image type
            if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
                removeTemp(file.tempFilePath)
                return res.status(400).json({msg : "Only Jpeg or Png files are allowed"})
            }

            //upload
            cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "products"}, (err, result) => {
                if(err) res.status(400).json({msg: err.message});
                removeTemp(file.tempFilePath);

                return res.status(200).json({
                    public_id: result.public_id,
                    url: result.secure_url
                })
            })

        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    deleteProduct : async (req, res)=>{
        try{
            const {public_id} = req.body;
            if(!public_id)
                return res.status(400).json({msg: "No public id found"})
            
            await cloudinary.v2.uploader.destroy(public_id, async(err, result)=>{
                if(err) throw err;
                res.status(200).json({msg: "Image Deleted Successfully"})
            })
            
            // res.json("Image Deleted")
        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    uploadProfileImg : async (req, res) => {
        try{
            // res.json({files: req.files})
            // res.json("image uploaded")
            if(!req.files || Object.keys(req.files).length===0)
            return res.status(400).json({msg: "No files were uploded"})

            const file = req.files.profileImg;
            // res.json({files : file})

            //validate the file size
            if(file.size > 5 * 1024 * 1024) {
                removeTemp(file.tempFilePath)
                return res.status(400).json({msg: "File size must be less than 5MB."})
            }
            // validate image type
            if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
                removeTemp(file.tempFilePath)
                return res.status(400).json({msg : "Only Jpeg or Png files are allowed"})
            }

            //upload
            cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "profile"}, (err, result) => {
                if(err) res.status(400).json({msg: err.message});
                removeTemp(file.tempFilePath);

                return res.status(200).json({
                    public_id: result.public_id,
                    url: result.secure_url
                })
            })

        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    deleteProfileImg : async (req, res)=>{
        try{
            const {public_id} = req.body;
            if(!public_id)
                return res.status(400).json({msg: "No public id found"})
            
            await cloudinary.v2.uploader.destroy(public_id, async(err, result)=>{
                if(err) throw err;
                res.status(200).json({msg: "Image Deleted Successfully"})
            })
            
            // res.json("Image Deleted")
        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    }
}
module.exports = imageCtrl;