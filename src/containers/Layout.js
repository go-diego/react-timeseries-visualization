import React from "react";
import styled from "styled-components";

export default function Layout({ children }) {
  return (
    <React.Fragment>
      <header>
        <nav
          className="navbar is-primary"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <a
              className="navbar-item is-uppercase has-text-weight-bold"
              href="/"
            >
              Logo
            </a>
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </React.Fragment>
  );
}
