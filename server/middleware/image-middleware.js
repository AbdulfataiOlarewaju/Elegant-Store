const multer = require("multer");

const path = require("path")



// set our multer storage

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, "uploads")
    },
    filename : function(req, file, cb){
        cb(null, 
            file.fieldname + "_" + Date.now()+ path.extname(file.originalname)
        )
    }
})
// add some file filters here 
const checkFileFilter = (req, file, cb)=> {
    if(file.mimetype.startsWith('image')){
        cb(null, true)
    } else {
        cb(new Error('this is not an image! please upload only images'))
    }
}

// multer middleware

module.exports = multer({
    storage : storage,
    fileFilter : checkFileFilter,
    limits : {
        fileSize : 5 * 1024 * 1024  // 5MB file sise limit
    }
}).single('my_file')
