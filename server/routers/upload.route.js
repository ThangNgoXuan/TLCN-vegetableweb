import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

let dir = '../uploads/'

const storage = (dir) => multer.diskStorage({
  destination(req, file, cb) {
    cb(null, dir)
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {

  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = (dir) => multer({
  storage: storage(dir),
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

const setDir = (dir, next) => {
  dir += dir
  next()
}

router.post('/category', upload(dir + 'category/').single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export const uploadsRouter = router