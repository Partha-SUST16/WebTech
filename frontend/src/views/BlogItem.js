import React, { Component } from "react";
import NavBar from './NavBar';
import StarRatingComponent from 'react-star-rating-component';
import * as ReactBootstrap from 'react-bootstrap';
class BlogItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
          id: null,
          isLoading: true,
          post: null,
          rating:1,
          currentStar:null,
          isLogged:null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
      }
    handleSubmit(){
    if(!this.state.isLogged){
      let token = localStorage.getItem("token");
      let givenRating = this.state.rating;
      let previousRating = this.state.post.rating;
      let previousCnt = this.state.post.cnt;
      previousCnt = previousCnt+1;
      let avg = previousRating/previousCnt;
      avg = avg+(givenRating/previousCnt);
       let data = {
         id:this.state.id,
         rating:avg
       };
        
         try {
           fetch("http://localhost:3002/api/post/rating", {
             method: "post",
             headers: {
               "Content-Type": "application/json",
               Authorization: token
             },
             body: JSON.stringify(data)
           }).then(res => {
             if (!res.ok) {
               alert("Not Submitted");
               return;
             } else {
               // res = res.json().then(data => {
               //   window.location.replace(`/post/${data._id}`);
               // });
               alert("Success");
             }
           });
       } catch (error) {
         alert(error);
       }
      
     }else{
       alert("Login First");
     }
    
    }
      componentDidMount() {
        const params = window.location.pathname.split("/");
        const id = params[2];
        this.setState({ id: id });
        this.setState({isLogged:localStorage.getItem("isLogged")})
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
           
            <h4>{this.state.post.title}</h4>
            <small>
              {` ${this.state.post.date} : ${this.state.post.time} - ${this.state.post.user.name} - Starts ${this.state.post.rating}` }
            </small>
            <p className="lead" style={{ letterSpacing: "1px" }}>
              {this.state.post.body}
            </p>
          </div>
        );
      }
    
      render() {
        const { rating } = this.state.rating;

        return (
            <div>
            <NavBar/>
          <div className="d-flex justify-content-center mt-5">
            <div className="col-md-6 ">{this.getView()}</div>
            <StarRatingComponent 
          name="rate1" 
          starCount={10}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />
        
        <ReactBootstrap.Button variant="outline-success" onClick={this.handleSubmit}>Submit Rating</ReactBootstrap.Button>
          </div>
         
          </div>
        );
      }
    
}
export default BlogItem;