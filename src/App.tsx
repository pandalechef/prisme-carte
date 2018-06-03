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
    caches
      .open("$$$toolbox-cache$$$https://prisme-carte.herokuapp.com/$$$")
      .then(cache =>
        // tslint:disable-next-line:no-console
        cache.keys().then(request => request.forEach(r => console.log(r)))
      );

    caches
      .open("$$$toolbox-cache$$$https://prisme-carte.herokuapp.com/$$$")
      .then(cache =>
        cache.keys().then(requests =>
          requests.forEach(request =>
            caches.match(request).then(response => {
              const header = response.headers;
              for (const key of header.keys()) {
                // tslint:disable-next-line:no-console
                console.log(key);
              }
            })
          )
        )
      );
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
