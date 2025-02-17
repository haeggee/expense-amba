import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import React from "react";
import Button from "@material-ui/core/Button";


/*
    This is defines major colors/fonts we are using in this project.
 */
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#344B72',
      light: '#E7EEF7',
      contrastText: '#FFFFFF'
    },
    common: {
      red: '#FF7C9B',
      grey: '#B5B5B5',
      white: '#FFFFFF',
      blue: '#156EC0'
    },
    background: {
      paper: '#FFFFFF'
    },
    text: {
      primary: '#000000',
      footer: '#FFFFFF',
      third: '#5d87cf'
    }
  },
  background: {
    paper: "#FFFFFF"
  },
  text: {
    primary: "#000000",
    third: "#5d87cf"
  },
  typography: {
    fontFamily: ["Open Sans", "Arial", "Mistral", "Verdana"].join(",")
  },
  mixins: {
    toolbar: {
      minHeight: 40
    }
  }
});

/*
This is the default button to use for the project.
Sample usage: <CustomButton> Text on the Button </CustomButton>
Classname can also be added to provide margins, padding, etc.
To do so do <CustomButton className={the-class-name}>
Click handlers can also be assigned via setting clickHandler={}
 */
export function CustomButton(props) {
  const className = props.className;

  return (
    <Button
      {...props}
      variant={"contained"}
      color={"primary"}
      className={className}
      style={{ textTransform: "none" }}
    >
      {props.children}
    </Button>
  );
}

export default theme;
