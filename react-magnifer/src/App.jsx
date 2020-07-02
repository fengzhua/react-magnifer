import React from "react";
import Magnifer from "./components/magnifer/magnifer";
import data from './components/constants/pictureSize.constant.js'
class App extends React.Component {
  render() {
    return (
      <Magnifer
      {...data}
      ></Magnifer>
    );
  }
}
export default App;
