import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomeWhiteMat from "./GUI/HomeWhiteMat";
import LogoComponent from "./GUI/LogoComponent";
import HomeDisplayText from "./GUI/HomeDisplayText";
import {CustomHeader} from "./GUI/Theme";

class Home extends React.Component {
  render() {
    return (
        <div>
          <header>
            { CustomHeader() }
          </header>
            <div style={{position: 'absolute', height: '100vh'}}>
                <img width={'100%'} alt={"Home illustration"} src={require("./GUI/imgs/home-illustration.jpg")} />
                {HomeWhiteMat()}
                <div style={{position: 'absolute', left: '20%', top: '20%', width: '20%'}}>
                    {LogoComponent()}
                </div>
                {HomeDisplayText()}
            </div>

        </div>
    );
  }
}

export default Home;
