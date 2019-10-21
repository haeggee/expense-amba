import React from 'react';
import './App.css';
import Header from './GUI/HeaderComponent';
import ButtonComponent from "./GUI/ButtonComponent";
import LogoComponent from "./GUI/LogoComponent";
import InputComponent from "./GUI/InputComponent";
import {CustomButton, CustomHeader} from "./GUI/Theme";

class Overview extends React.Component {
  render() {
    return (
        <div>
          <CustomHeader />

        </div>
    );
  }
}
export default Overview;
