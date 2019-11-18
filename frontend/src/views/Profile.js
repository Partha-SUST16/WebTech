import React, { Component } from "react";
import NavBar from './NavBar';
import './Profile.css';
class PostItem extends Component{
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
          fetch(`http://localhost:3002/api/post/${this.props.post._id}/delete`, {
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
                  <a href={`/postupdate/${this.props.post._id}`} className="btn btn-sm btn-default">Update</a>

                </div>
              </div>
            </div>
          </div>
        );
      }
}
class Profile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        user: null,
  
        inputName: null
      };
  
      this.handleUpdate = this.handleUpdate.bind(this);
    }
  
    componentDidMount() {
      let token = localStorage.getItem("token");
      if (!token) {
        alert("user is not authenticated");
        return;
      }
      this.loadProfile(token);
    }
  
    loadProfile(token) {
      try {
        fetch("http://localhost:3002/api/profile", {
          method: "get",
          headers: {
            Authorization: token
          }
        }).then(res => {
          if (!res.ok) {
            alert("user is not valid");
            return;
          } else {
            res = res.json().then(data => {
              this.setState({
                user: data.user,
                postSet: data.postSet,
                isLoading: false
              });
            });
          }
        });
      } catch (err) {
        alert("something went wrong");
      }
    }
  
    updateProfile(token, data) {
      try {
        fetch("http://localhost:3002/api/profile/update", {
          method: "post",
          headers: {
            Authorization: token,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }).then(res => {
          if (!res.ok) {
            alert("user is not valid");
            return;
          } else {
            res = res.json().then(data => {
              window.location.reload();
            });
          }
        });
      } catch (err) {
        alert("something went wrong");
      }
    }
  
    handleUpdate(event) {
      event.preventDefault();
      let token = localStorage.getItem("token");
      if (!token) {
        alert("user is not authenticated");
        return;
      }
      let data = {
        name: this.state.inputName
      };
      this.setState({ inputName: null });
      this.updateProfile(token, data);
    }
  
    profileView() {
      return (
          <div>
          <div className="list-group-item">
            <h6>ID : {this.state.user._id}</h6>
            <h6>Name : {this.state.user.name}</h6>
            <h6>Email: {this.state.user.email}</h6>
          </div>
          <br />
          {/* <a
            href="/create-post"
            className="list-group-item list-group-item-action text-center font-weight-bold"
          >
            Create Post
          </a>
          <br /> */}
          <form method="post" onSubmit={this.handleUpdate}>
            <div className="list-group-item">
              <h6 className="text-center">Update Profile</h6>
              <input
                type="text"
                defaultValue={this.state.user.name}
                className="form-control"
                onChange={event => {
                  this.setState({ inputName: event.target.value });
                }}
              />
              <button type="submit" className="btn btn-success mt-2">
                Update
              </button>
            </div>
          </form>
          <br />
          <div className="list-group">
            <h5 className="text-center">My Posts</h5>
            {this.state.postSet.map((item, index) => (
              <PostItem post={item} key={index} />
            ))}
          </div>
          </div>
      );
    }
  
    getView() {
      if (this.state.isLoading) {
        return (
          <div className="d-flex justify-content-center">
            <div className="spinner spinner-border"></div>
          </div>
        );
      }
      return this.profileView();
    }
  
    render() {
      return (
          <div><NavBar/>
        <div className="container-fluid mt-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-6">{this.getView()}</div>
          </div>
        </div>
        </div>
      );
    }
  }
  export default Profile;