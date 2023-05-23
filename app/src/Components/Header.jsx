import React, { useState } from 'react';

import "./css/Header.css";

function Login() {
  const defaultPath = "../../public";

  return (
    <header class="flex-row">
      <img src="img/logo/logo.png" alt="logo" class="logo"/>
      <div class="search-bar">
          <input type="text" class="search-text"/>
          <div class="search-loupe-div">
              <img src="/img/header/search-loupe.png" alt="search loupe" class="search-loupe"/>
          </div>
      </div>

      <div class="navbar">
          <a href="home">
              <div class="navbar-links">
                  <img src="img/header/home.png" alt="home" class="icon"/>
              </div>
          </a>
          <a href="#">
              <div class="navbar-links">
                  <img src="img/header/shopping-cart.png" alt="shopping cart" class="icon"/>
              </div>
          </a>
          <a href="login">
              <div class="navbar-links">
                  <img src="img/header/user.png" alt="user" class="icon"/>
              </div>
          </a>
      </div>
    </header>
  );
}

export default Login;
