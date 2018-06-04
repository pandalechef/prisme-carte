import * as React from "react";
import SortableComponent from "src/Sortable";
import "./App.css";
import logo from "./logo.svg";
import Map from "./Map";

export interface IPdv {
  enseigne: string;
  adresse: string;
  lat: number;
  lng: number;
}
export interface IMenu3State {
  pdvs: IPdv[];
  requests: Request[];
}

// tslint:disable-next-line:no-empty-interface
interface IPropsInterface {}
class App extends React.Component<IPropsInterface, IMenu3State> {
  constructor(props: IPropsInterface) {
    super(props);
    const pdv1 = {
      adresse: "adresse1",
      enseigne: "Carrefour",
      lat: 48.816363,
      lng: 2.317384
    };
    const pdv2 = {
      adresse: "adresse2",
      enseigne: "Auchan",
      lat: 48.816363,
      lng: 2.316384
    };
    const pdv3 = {
      adresse: "adresse3",
      enseigne: "Franprix",
      lat: 48.816363,
      lng: 2.315384
    };
    const pdv4 = {
      adresse: "adresse4",
      enseigne: "Intermarché",
      lat: 48.815363,
      lng: 2.317384
    };
    const pdv5 = {
      adresse: "adresse5",
      enseigne: "Super U",
      lat: 48.814363,
      lng: 2.317384
    };
    this.state = { pdvs: [pdv1, pdv2, pdv3, pdv4, pdv5], requests: [] };
    this.handleClick = this.handleClick.bind(this);
    this.onMove = this.onMove.bind(this);
  }

  public onMove(pdvs: IPdv[]) {
    this.setState({ pdvs });
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
          <SortableComponent onMove={this.onMove} pdvs={this.state.pdvs} />
          <br />
          <Map pdvs={this.state.pdvs} />
        </div>
        <br />
        <div>
          <button onClick={this.handleClick}>Vider le cache</button>
          <h2>URL en cache</h2>
          <ol>{this.state.requests.map((r, i) => <li key={i}>{r.url}</li>)}</ol>
        </div>
      </div>
    );
  }
}

export default App;
