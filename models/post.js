const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String
    },
    likes:[{type:mongoose.Types.ObjectId,ref:"users"}],
    comments:[{
        text:String,
        postedBy:{type:mongoose.Types.ObjectId,ref:"users"}
    }],
    postedBy:{
       type:mongoose.Types.ObjectId,
       ref:"users"
    }
}, {
    timestamps: true
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post

