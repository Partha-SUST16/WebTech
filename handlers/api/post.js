let Post = require("../../core/db").Post;
let getObjectId = require("../../core/db").getObjectId;

class PostManager {
  singlePost(req, res) {
    try {
      const id = new getObjectId(req.params.id);
      Post.findOne({ _id: id }, (err, result) => {
        if (err) {
          res.status(400).send(err);
          return;
        }
        res.send(result);
      });
    } catch (err) {
      res.status(400).send(err);
    }
  }

  allPost(req, res) {
    try {
      Post.find({}, (err, result) => {
        if (err) {
          res.send(err);
        }
        res.send(result);
      });
    } catch (error) {
      res.send(error);
    }
  }

  createPost(req, res) {
    let data = req.body;
    data.user = req.user;
    data.time = new Date().toLocaleTimeString();
    data.date = new Date().toLocaleDateString();
    Post.create(data, (err, result) => {
      if (err) {
        res.status(400).send(err);
        return;
      }
      res.send(result.ops[0]);
    });
  }
  updatePost(req,res){
    try {
      let id = req.body.id;
      let upbody = req.body.description;
      let uptitle = req.body.title;
      Post.updateOne({_id:new getObjectId(id)},
        {$set:{
          title:uptitle,
          body:upbody
        }},
        (err,result)=>{
          if (err) {
            res.status(400).send(err);
            return;
          }
          res.send(result);
      });
    } catch (error) {
      res.status(400).send(err);
    }
  }
  update(req,res){
     try {
       //let rating = req.body.rating;
       const query = { "post._id": req.body.id };
       
       Post.findOne({_id:new getObjectId(req.body.id)}, (err, result) => {
        if (err) {
          res.status(400).send({ post: req.body, err: err });
          return;
        }
        Post.updateOne(
          {
          _id:new getObjectId(req.body.id)
        },
        {$inc:{
          "cnt":1
        }}
        );
        Post.updateOne(
          {_id:new getObjectId(req.body.id)},
          {$set:{"rating":parseFloat(req.body.rating).toFixed(2)}}
        );
        res.send({
          postSet: result
        });
      });
      // db.collection("post").findOne(query, (err, result) => {
      //     if (err) {
      //       res.status(400).send({ post: req.body, err: err });
      //       return;
      //     }
      //     res.send({
      //       postSet: result
      //     });
      //   });
          
    } catch (error) {
      res.status(400).send(error);
    }
    //res.status(200).send(rating);
  }

//   addCommentOnPost(req, res) {
//     let data = req.body;
//     data.user = req.user;
//     data.time = new Date().toLocaleTimeString();
//     data.date = new Date().toLocaleDateString();
//     Post.addComent(req.params.id, data, (err, result) => {
//       if (err) {
//         res.status(400).send(err);
//         return;
//       }
//       res.send(result.result);
//     });
//   }

  deletePost(req, res) {
    try {
      const id = new getObjectId(req.params.id);
      Post.findOne({ _id: id }, (err, result) => {
        if (err) {
          res.status(400).send(err);
          return;
        }
        if (!req.user._id.equals(result.user._id)) {
          res.status(405).send("access denied");
          return;
        }
        Post.deleteOne({ _id: id }, (err, result) => {
          if (err) {
            res.status(400).send(err);
            return;
          }
          res.send(result);
        });
      });
    } catch (err) {
      res.status(400).send(err);
    }
  }
}

module.exports = new PostManager();
