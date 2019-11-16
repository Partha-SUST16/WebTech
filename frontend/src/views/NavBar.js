import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import { BrowserRouter  } from 'react-router-dom';

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
 getNavOptions(){
     if(this.state.isLogged){
         return (
            <MDBNavbar color="default-color" dark expand="md">
            <MDBNavbarBrand>
          <strong className="white-text">Redit</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to="/">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/profile">Profile</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/postcreate">Create Post</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="!#">Signout</MDBNavLink>
            </MDBNavItem>
            
          </MDBNavbarNav>
         
        </MDBCollapse>
      </MDBNavbar>
         );
     } else{
         return (
            <MDBNavbar color="default-color" dark expand="md">
            <MDBNavbarBrand>
          <strong className="white-text">Redit</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to="/">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/signin">Signin</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/signup">Signup</MDBNavLink>
            </MDBNavItem>
            
          </MDBNavbarNav>
         
        </MDBCollapse>
      </MDBNavbar>
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