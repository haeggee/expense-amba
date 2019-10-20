import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './GUI/HeaderComponent'
import HomeWhiteMat from "./GUI/HomeWhiteMat";
import Button from "./GUI/ButtonComponent";
import LogoComponent from "./GUI/LogoComponent";

class Home extends React.Component {
  render() {
    return (
        <div>
          <header>
            { Header() }
          </header>
            <div style={{position: 'absolute'}}>
                <img width={'100%'} alt={"Home illustration"} src={require("./GUI/imgs/home-illustration.jpg")} />
                {HomeWhiteMat()}
                {LogoComponent()}
            </div>

        </div>
    );
  }
}

export default Home;
