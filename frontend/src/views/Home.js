import React, { Component } from "react";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import NavBar from './NavBar';
const Card = props=>{
    return (
        <MDBCol>
            <MDBCard style={{ width: "22rem" }}>
                <MDBCardBody>
                <MDBCardTitle >
                    
                        {props.data.title}
                   
                </MDBCardTitle>
                <MDBCardText>
                {`${props.data.time} ${props.data.date}`}
                <br></br>
                {props.data.user.name}
                </MDBCardText>
                <MDBBtn href={`/post/${props.data._id}`}>Details</MDBBtn>
                </MDBCardBody>
            </MDBCard>
            </MDBCol>
    );
}
class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
          isLoading: true,
          postSet: []
        };
      }
      componentDidMount() {
        try {
          fetch("http://localhost:3002/api/post/all", {
            method: "get",
            headers: {}
          })
            .then(res => res.json())
            .then(data => {
              this.setState({
                isLoading: false,
                postSet: data
              });
            });
        } catch (err) {
          console.log(err);
          alert("something went wrong");
        }
      }
      getPostsGrid() {
        return (
          <div>
            <NavBar/>
            <div className="card-columns ml-3 mr-3">
            {this.state.postSet.map((item, index) => (
              <Card key={index} data={item} />
            ))}
            </div>
          </div>
        );
      }
      loader() {
        return (
          <div className="d-flex justify-content-center">
            <div className="spinner spinner-border"></div>
          </div>
        );
      }
      render() {
        if (this.state.isLoading) return this.loader();
        return this.getPostsGrid();
      }
}
export default Home;