import React from 'react';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { connect } from "react-redux";
import { logOut } from "../../store/userRedux";
import { useNavigate } from "react-router-dom";
import * as _ from "lodash";

function NavBar({ userDetails, logoutAsync }) {
  const navigate = useNavigate();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        {/* <Navbar.Brand href="#">Navbar scroll</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/managepost">ManagePost</Nav.Link>
            <Nav.Link href="/signup">SignUp</Nav.Link>
            {userDetails == undefined && (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
            {userDetails !== undefined && (
                 <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as: {userDetails.userName}
              </Navbar.Text>
              </Navbar.Collapse>
            )}
            {userDetails !== undefined && (
              <NavDropdown title="Actions" id="navbarScrollingDropdown">
                <NavDropdown.Item
                  onClick={() => {
                    logoutAsync();
                    navigate("/login");
                  }}
                >
                  Loguot
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
const mapStateToProps = ({ UserAuth = {} }) => {
  const userDetails = _.get(UserAuth, "userInfo", undefined);

  return {
    userDetails,
  };
};
const mapDispatchToProps = (dispatch) => ({
  logoutAsync: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
