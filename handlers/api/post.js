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
