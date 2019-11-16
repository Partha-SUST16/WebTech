import React, { Component } from "react";
import NavBar from './NavBar';
class BlogItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
          id: null,
          isLoading: true,
          post: null
        };
      }
    
      componentDidMount() {
        const params = window.location.pathname.split("/");
        const id = params[2];
        this.setState({ id: id });
        this.loadPost(id);
      }
      loadPost(id) {
        try {
          fetch(`http://localhost:3002/api/post/${id}`, {
            method: "get",
            headers: {}
          })
            .then(res => res.json())
            .then(data => {
              this.setState({
                isLoading: false,
                post: data
              });
            });
        } catch (err) {
          console.log(err);
          alert("something went wrong");
        }
      }
      getView() {
        if (this.state.isLoading) {
          return (
              
            <div className="d-flex justify-content-center">
              <div className="spinner spinner-border"></div>
            </div>
           
          );
        }
    
        return (
          <div>
            <NavBar/>
            <h4>{this.state.post.title}</h4>
            <small>
              {` ${this.state.post.date} : ${this.state.post.time} - ${this.state.post.user.name}`}
            </small>
            <p className="lead" style={{ letterSpacing: "1px" }}>
              {this.state.post.body}
            </p>
          </div>
        );
      }
    
      render() {
        return (
          <div className="d-flex justify-content-center mt-5">
            <div className="col-md-6 ">{this.getView()}</div>
          </div>
        );
      }
    
}
export default BlogItem;