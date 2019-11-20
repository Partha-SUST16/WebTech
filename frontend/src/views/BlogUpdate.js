import React, { Component } from "react";
import NavBar from './NavBar';

class BlogUpdate extends Component{
    constructor(props){
        super(props);
        this.state={
            id: null,
            isLoading: true,
            post: null,
            inputTitle:null,
            inputBody:null,
            token:null
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount() {
        let isLogged = localStorage.getItem("isLogged");
        if (!isLogged) {
          window.location.replace("/login");
        }
        const params = window.location.pathname.split("/");
        const id = params[2];
        this.setState({ id: id });
        let token = localStorage.getItem("token");
        this.setState({ token: token });       
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
              //alert(JSON.stringify(this.state.post.title));
              this.setState({title:this.state.post.title});
              this.setState({body:this.state.post.body});
              //alert(JSON.stringify(this.state.body));
            });
            //this.setState({title:this.state.post.title});
            //alert(JSON.stringify(this.state.post));
        } catch (err) {
          console.log(err);
          alert("something went wrong");
        }
      }
      handleSubmit(event) {
        event.preventDefault();
        let data = {
          title: (this.state.inputTitle!=null?this.state.inputTitle:this.state.title),
          description: (this.state.inputBody!=null?this.state.inputBody:this.state.body),
          id: this.state.id
        };
    
        try {
          fetch("http://localhost:3002/api/post/update", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: this.state.token
            },
            body: JSON.stringify(data)
          }).then(res => {
            if (!res.ok) {
              alert("user is not valid");
              return;
            } else {
              res = res.json().then(data => {
                window.location.replace(`/post/${this.state.id}`);
              });
            }
          });
        } catch (err) {
          alert("something went wrong");
        }
      }
      formView() {
        return (
          <form method="post" onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder={this.state.title}
             
              className="form-control"
              onChange={event => {
                this.setState({ inputTitle: event.target.value });
              }}
            />
    
            <textarea
              style={{ minHeight: "200px" }}
              placeholder={this.state.body}
              className="form-control mt-3"
             
              onChange={event => {
                this.setState({ inputBody: event.target.value });
              }}
            ></textarea>
    
            <button
              type="submit"
              className="btn bg-light-gray btn-block mt-4"
              onSubmit={this.handleSubmit}
            >
              Update
            </button>
          </form>
        );
      }
    
      render() {
        return (
            <div>
            <NavBar/>
          <div className="container-fluid mt-5">
            <div className="row d-flex justify-content-center">
              <div className="col-md-6 list-group-item">
                <h6 className="text-center">Update Own Post</h6>
                {this.formView()}
              </div>
            </div>
          </div>
          </div>
        );
      }
}
export default BlogUpdate;