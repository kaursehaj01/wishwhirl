const multer = require('multer');
const path = require('path');

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'upload/images/'); // Specify the folder to save images
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
      // return cb(null,`${file.filename}_${Date.now()}${path.extname(file.originalname)}`)

    }
  });
  // const upload = multer({ Storage });
const upload = multer({storage:Storage})

module.exports = upload;