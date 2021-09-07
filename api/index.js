const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const postRoute = require('./routes/post')
const categoryRoute = require('./routes/category')
const path = require('path')


const app = express()
dotenv.config()

app.use(express.json())
app.use('/images', express.static(path.join(__dirname, '/images')))

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})
.then(console.log('Connected to MongoDB'))
.catch((error) => console.log(error))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})

const upload = multer({ storage: storage })
app.post('/api/upload', upload.single('file'), (req, res) => {
    res.status(200).json('File has been uploaded')
})

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)
app.use('/api/categories', categoryRoute)

app.listen('5000', () => {
    console.log('Connected to Backend')
})