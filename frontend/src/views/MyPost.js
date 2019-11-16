
import React,{Component} from 'react';
import NavBar from './NavBar';
class PostItem extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.delete = this.delete.bind(this);
    }
  
    delete(event) {
      event.preventDefault();
      let token = localStorage.getItem("token");
      if (!token) {
        alert("user is not authenticated");
        return;
      }
  
      try {
        fetch(`http://localhost:3000/api/post/${this.props.post._id}/delete`, {
          method: "get",
          headers: {
            Authorization: token
          }
        }).then(res => {
          if (!res.ok) {
            alert("invalid");
            return;
          } else {
            window.location.reload();
          }
        });
      } catch (err) {
        alert(err);
      }
    }
  
    render() {
      return (
        <div className="list-group-item">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-10">
                <h6>
                  <a href={`/post/${this.props.post._id}`}>
                    {this.props.post.title}
                  </a>
                </h6>
              </div>
              <div className="class-sm-auto">
                <button className="btn btn-sm btn-danger" onClick={this.delete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
class MyPost extends Component{

}