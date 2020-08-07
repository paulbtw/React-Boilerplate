import React from "react";
import { Nav } from "..";
import Container from "react-bootstrap/esm/Container";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Nav />
      <Container>{children}</Container>
    </>
  );
};
