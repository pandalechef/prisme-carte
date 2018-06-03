import * as React from "react";
import "./App.css";
import logo from "./logo.svg";
import Map from "./Map";

class App extends React.Component {
  public render() {
    // const cacheName =
    //   "sw-precache-v3-sw-precache-https://prisme-carte.herokuapp.com/";
    caches.keys().then(keyList => {
      // tslint:disable-next-line:no-console
      return Promise.all(keyList.map(key => console.log("clé ", key)));
    });
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <Map />
        </div>
      </div>
    );
  }
}

export default App;
