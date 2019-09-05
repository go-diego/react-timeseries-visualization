import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative !important;
  width: 100%;
  height: 100%;
  &:hover {
    background-color: #dcdcdc;
  }
`;

const StretchedLink = styled.a`
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    content: "";
  }
`;

export default function TagCard({ children, id }) {
  return (
    <Container className="notification box">
      <StretchedLink data-testid="tag-anchor" href={`/timeseries/${id}`}>
        <div>{children}</div>
      </StretchedLink>
    </Container>
  );
}
