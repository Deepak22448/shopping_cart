import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CartSvg from "./CartSvg";
const Navbar = () => {
  const { cartItems, cartQuantity, openCart } = useShoppingCart();
  return (
    <NavbarBs className="bg-white shadow-sm mb-3" sticky="top">
      <Container>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>

          <Nav.Link as={NavLink} to="/store">
            Store
          </Nav.Link>

          <Nav.Link as={NavLink} to="/about">
            About
          </Nav.Link>
        </Nav>

        {cartQuantity > 0 ? (
          <Button
            style={{ height: "3rem", width: "3rem", position: "relative" }}
            variant="outline-primary"
            className="rounded-circle"
            onClick={openCart}
          >
            <CartSvg />
            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
              style={{
                color: "white",
                height: "1.5rem",
                width: "1.5rem",
                position: "absolute",
                bottom: 0,
                right: 0,
                translate: "25% 25%",
              }}
            >
              {cartQuantity}
            </div>
          </Button>
        ) : null}
      </Container>
    </NavbarBs>
  );
};

export default Navbar;
