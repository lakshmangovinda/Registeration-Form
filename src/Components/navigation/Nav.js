import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { HomePageTitle, NavBarWrapper } from "./styledNav";


export const NavigationBar = () => {
  let navigate = useNavigate();
  return (
    <NavBarWrapper>
    <Navbar bg="dark" expand="lg" variant="dark">
      <HomePageTitle><Nav.Link  onClick={() => navigate("/home")}>Home</Nav.Link></HomePageTitle>
   
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav  >
            <Nav.Link onClick={() => navigate("/Registered")}>RegisteredData</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      
    </Navbar>
    </NavBarWrapper>
  );
}

export default NavigationBar;