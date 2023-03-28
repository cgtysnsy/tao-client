import React from "react";
import { Navbar, NavbarBrand } from "react-bootstrap";
import { SocialIcon } from "react-social-icons";

function NavBar() {
  return (
    <>
      <Navbar
        className="mt-2"
        color="dark"
        dark
        style={{ padding: "0 1rem", margin: "0 1rem" }}
      >
        <NavbarBrand href="/">
          <SocialIcon
            url="https://www.instagram.com/tao.eatdrink/"
            fgColor="gray"
            bgColor="transparent"
            style={{ height: 45, width: 45 }}
            target="_blank"
          />
        </NavbarBrand>
      </Navbar>
      {/* <Navbar className="m-6" color="secondary" dark></Navbar>
      <Navbar className="my-2" color="dark" dark>
        <NavbarBrand href="/"></NavbarBrand>
      </Navbar> */}
    </>
  );
}

export default NavBar;
