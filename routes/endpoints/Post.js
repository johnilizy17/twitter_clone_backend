const Post = require('../../models/post');
const User = require("../../models/user");
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const upload = multer({ dest: 'uploads/' })
const { tokenCallback } = require("../../functions/token");

const { verifyToken } = tokenCallback();

const { uploadFile, getFileStream } = require('../../functions/S3')

async function ImageUpload(file) {
    const result = await uploadFile(file)
    return result.Location
}


let routes = (app) => {

    //   get image by server
    //   app.get('/images/:key', (req, res) => {
    //     console.log(req.params)
    //     const key = req.params.key
    //     const readStream = getFileStream(key)

    //     readStream.pipe(res)
    //   })

    app.post('/Post', upload.single('image'), async (req, res) => {

        const file = req.file
        const responses = verifyToken({ authToken: req.header("authorization") });

        if (responses.data.id) {
            const imageLink = await ImageUpload(file)
            if (imageLink) {
                try {
                    let post = new Post({ ...req.body, photo: imageLink, postedBy: responses.data.id });
                    await post.save()
                    res.json(post)
                }
                catch (err) {
                    console.log(err)
                    res.status(500).send(err)
                }
            } else {
                res.status(305).send("image filed to upload")
            }
        } else {
            res.status(400).send("you are not authorised")
        }
    });


    // get all posts
    app.get('/posts', async (req, res) => {
        const page = parseInt(req.query.limit) - 10 || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";

        if (search.includes("@")) {

            const userTag = search.replace("@", "")
            let users = await User.findOne({ username: userTag })
            if (!users) {
                res.json({ post: [], pageNumber: 1 })
            } else {
                try {
                    let count = await Post.count(({ postedBy: users._id }))
                    let post = await Post.find(({ postedBy: users._id })).skip(page).limit(limit).sort({ createdAt: -1 })
                        .populate("postedBy")
                        .populate("comments.postedBy", "likes")
                    res.json({ post, pageNumber: Math.round((count / (limit - page)) + 0.4) })
                }
                catch (err) {
                    console.log(err)
                    res.status(400).send(err)
                }
            }
        } else {
            try {
                let count = await Post.count(({ title: { $regex: search, $options: "i" } }))
                let post = await Post.find(({ title: { $regex: search, $options: "i" } })).skip(page).limit(limit).sort({ createdAt: -1 })
                    .populate("postedBy")
                    .populate("comments.postedBy", "likes")

                res.json({ post, pageNumber: Math.round((count / (limit - page)) + 0.4) })
            }
            catch (err) {
                console.log(err)
                res.status(400).send(err)
            }
        }
    });

    app.get('/post/blog/:id', async (req, res) => {
        try {
            let post = await Post.findOne({ _id: req.params.id }).populate("postedBy").populate("comments.postedBy", "likes")
            res.json(post)
        }
        catch (err) {
            res.status(500).send(err)
        }
    });

    app.put('/post/blog/:id', upload.single('image'), async (req, res) => {

        let productPost = await Post.findOne({ _id: req.params.id }).populate("postedBy").populate("comments.postedBy", "likes")
       let likes
        productPost.likes.map((r,i)=>{
           if(r ===req.body.likes) likes= true
        })

        if(!likes){
        productPost.likes.push(req.body.likes)
        }
        productPost.comments.push(req.body.comments)
        
        const update = { likes:productPost.likes, comments:productPost.comments}

                try {
                    let product = await Post.updateOne({ _id: req.params.id }, update, { returnOriginal: false });
                    res.json(product)
                }
                catch (err) {
                    console.log(err)
                    res.status(500).send(err)
                }

    });

    app.delete('/post/:id', async (req, res) => {
        try {
            await Post.deleteOne({ _id: req.params.id })
            res.json({ msg: "Post Deleted" })
        }
        catch (err) {
            res.status(500).send(err)
        }
    });

};

module.exports = routes;