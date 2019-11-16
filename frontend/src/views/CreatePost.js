import React,{Component} from 'react';
import NavBar from './NavBar';
class CreatePost extends Component{
    constructor(props) {
        super(props);
        this.state = {
          inputTitle: null,
          inputBody: null
        };
    
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      componentDidMount() {
        let isLogged = localStorage.getItem("isLogged");
        if (!isLogged) {
          window.location.replace("/login");
        }
        let token = localStorage.getItem("token");
        this.setState({ token: token });
      }
    
      handleSubmit(event) {
        event.preventDefault();
        let data = {
          title: this.state.inputTitle,
          body: this.state.inputBody
        };
    
        try {
          fetch("http://localhost:3002/api/post/create", {
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
                window.location.replace(`/post/${data._id}`);
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
              placeholder="Title"
              className="form-control"
              onChange={event => {
                this.setState({ inputTitle: event.target.value });
              }}
            />
    
            <textarea
              style={{ minHeight: "200px" }}
              placeholder="Body"
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
              Post
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
                <h6 className="text-center">Create Own Post</h6>
                {this.formView()}
              </div>
            </div>
          </div>
          </div>
        );
      }
}
export default CreatePost;