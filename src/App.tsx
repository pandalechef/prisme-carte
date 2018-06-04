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
  positionCentre: [number, number];
}

// tslint:disable-next-line:no-empty-interface
interface IPropsInterface {}
class App extends React.Component<IPropsInterface, IMenu3State> {
  public options = {
    enableHighAccuracy: false,
    maximumAge: 0,
    timeout: 240000
  };

  constructor(props: IPropsInterface) {
    super(props);
    this.state = { pdvs: [], positionCentre: [0, 0] };
    this.handleClick = this.handleClick.bind(this);
    this.onMove = this.onMove.bind(this);
  }

  public getPosition(options: PositionOptions) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  public getPdvsByCenter(altitude: number, longitude: number) {
    return [
      {
        adresse: "adresse1",
        enseigne: "Carrefour",
        lat: altitude - 0.001,
        lng: longitude - 0.001
      },
      {
        adresse: "adresse2",
        enseigne: "Auchan",
        lat: altitude - 0.001,
        lng: longitude + 0.001
      },
      {
        adresse: "adresse3",
        enseigne: "Franprix",
        lat: altitude + 0.0001,
        lng: longitude - 0.001
      },
      {
        adresse: "adresse4",
        enseigne: "Intermarché",
        lat: altitude - 0.0003,
        lng: longitude + 0.001
      },
      {
        adresse: "adresse5",
        enseigne: "Super U",
        lat: altitude + 0.0007,
        lng: longitude + 0.0007
      }
    ];
  }

  public componentWillMount() {
    this.getPosition(this.options)
      .then((position: Position) => {
        const pdvsGeolocalise = this.getPdvsByCenter(
          position.coords.latitude,
          position.coords.longitude
        );
        this.setState({
          pdvs: pdvsGeolocalise,
          positionCentre: [position.coords.latitude, position.coords.longitude]
        });
      })
      .catch(err => {
        const pdvsGeolocalise = this.getPdvsByCenter(48.8155, 2.317);
        this.setState({
          pdvs: pdvsGeolocalise,
          positionCentre: [48.8155, 2.317]
        });
      });
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
    // caches
    //   .open("$$$toolbox-cache$$$https://prisme-carte.herokuapp.com/$$$")
    //   .then(cache =>
    //     cache.keys().then(requests => this.setState({ requests }))
    //   );

    if (
      this.state.positionCentre[0] === 0 &&
      this.state.positionCentre[1] === 0
    ) {
      return "En cours de géolocalisation";
    }
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
          <Map
            pdvs={this.state.pdvs}
            positionCentre={this.state.positionCentre}
          />
        </div>
        <br />
        <div>
          <button onClick={this.handleClick}>Vider le cache</button>
        </div>
      </div>
    );
  }
}

export default App;
