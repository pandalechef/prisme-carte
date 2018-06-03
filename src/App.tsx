import * as React from "react";
import SortableComponent from "src/Sortable";
import "./App.css";
import logo from "./logo.svg";
import Map from "./Map";
interface IStateInterface {
  requests: Request[];
}
// tslint:disable-next-line:no-empty-interface
interface IPropsInterface {}
class App extends React.Component<IPropsInterface, IStateInterface> {
  constructor(props: IPropsInterface) {
    super(props);
    this.state = { requests: [] };
    this.handleClick = this.handleClick.bind(this);
  }

  public handleClick() {
    caches
      .open("$$$toolbox-cache$$$https://prisme-carte.herokuapp.com/$$$")
      .then(cache =>
        cache
          .keys()
          .then(requests => requests.forEach(request => cache.delete(request)))
      );
  }
  public render() {
    caches
      .open("$$$toolbox-cache$$$https://prisme-carte.herokuapp.com/$$$")
      .then(cache =>
        cache.keys().then(requests => this.setState({ requests }))
      );

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Test cartographie et cache</h1>
        </header>
        <br />
        <div>
          <SortableComponent />
          <br />
          <Map />
        </div>
        <br />
        <button onClick={this.handleClick}>Vider le cache</button>
        <h2>URL en cache</h2>
        <ol>{this.state.requests.map((r, i) => <li key={i}>{r.url}</li>)}</ol>
      </div>
    );
  }
}

export default App;
