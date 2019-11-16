import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import { BrowserRouter  } from 'react-router-dom';
import { Link ,Redirect} from 'react-router-dom';
import { Button, Navbar,Nav } from 'react-bootstrap'

class NavbarPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isLogged: false,
          token: null,
          isOpen: false
        };
      }
      componentDidMount() {
        let isLogged = localStorage.getItem("isLogged");
        if (isLogged) {
          let token = localStorage.getItem("token");
          this.setState({
            isLogged: true,
            token: token
          });
        }
      }
      toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
      }
      logout(event){
        event.preventDefault();
        localStorage.clear();
        window.location.replace("/");
      }
 getNavOptions(){
     if(this.state.isLogged){
         return (
            <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="/">Blog</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link href="/postcreate">Create Post</Nav.Link>
              <Nav.Link href="/signin">Signout</Nav.Link>
            </Nav>
          </Navbar>
         );
     } else{
         return (
    //         <MDBNavbar color="default-color" dark expand="md">
    //         <MDBNavbarBrand>
    //       <strong className="white-text">Redit</strong>
    //     </MDBNavbarBrand>
    //     <MDBNavbarToggler onClick={this.toggleCollapse} />
    //     <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
    //       <MDBNavbarNav left>
    //         <MDBNavItem active>
    //           <MDBNavLink to="/">Home</MDBNavLink>
    //         </MDBNavItem>
    //         <MDBNavItem>
    //           <MDBNavLink to="/signin">Signin</MDBNavLink>
    //         </MDBNavItem>
    //         <MDBNavItem>
    //           <MDBNavLink to="/signup">Signup</MDBNavLink>
    //         </MDBNavItem>
            
    //       </MDBNavbarNav>
         
    //     </MDBCollapse>
    //   </MDBNavbar>
    <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="/">Blog</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/signin">Signin</Nav.Link>
      <Nav.Link href="/signup">Signup</Nav.Link>
    </Nav>
  </Navbar>
         );
     }
 }

render() {
  return (
    <BrowserRouter>
        {this.getNavOptions()}
    </BrowserRouter>
    );
  }
}

export default NavbarPage;