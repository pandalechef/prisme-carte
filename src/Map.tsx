import L from "leaflet";
import React from "react";
import { Map, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import logoPinPerson from "./marker-pin-person.svg";
import spinner from "./spinner.svg";

interface IPdvsInterface {
  pdvs: Array<{
    enseigne: string;
    adresse: string;
    lat: number;
    lng: number;
    nbReleve: number;
  }>;
  positionCentre: [number, number];
}

interface IState {
  isLoading: boolean;
  lat: number;
  lng: number;
}

export default class SimpleExample extends React.Component<
  IPdvsInterface,
  IState
> {
  public options = {
    enableHighAccuracy: false,
    maximumAge: 0,
    timeout: 240000
  };

  public iconPerson = new L.Icon({
    iconRetinaUrl: logoPinPerson,
    iconSize: new L.Point(40, 55),
    iconUrl: logoPinPerson
  });

  constructor(props: IPdvsInterface) {
    super(props);
    this.state = {
      isLoading: false,
      lat: this.props.positionCentre[0],
      lng: this.props.positionCentre[1]
    };
    this.handleClick = this.handleClick.bind(this);
  }

  public getPosition(options: PositionOptions) {
    this.setState({ isLoading: true });
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  public handleClick() {
    this.getPosition(this.options).then((p: Position) => {
      this.setState({
        isLoading: false,
        lat: p.coords.latitude,
        lng: p.coords.longitude
      });
    });
  }

  public render() {
    const position: [number, number] = [this.state.lat, this.state.lng];
    return (
      <>
        <div>
          <button onClick={this.handleClick}>Actualiser la position</button>
          {this.state.isLoading && <img src={spinner} alt="logo" />}
        </div>
        <br />
        <br />
        <Map center={position} zoom={17}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={{ lat: this.state.lat, lng: this.state.lng }}
            icon={this.iconPerson}
          >
            <Popup>
              <span>Je suis là</span>
            </Popup>
          </Marker>
          {this.props.pdvs.map((pdv, i) => (
            <Marker key={i} position={{ lat: pdv.lat, lng: pdv.lng }}>
              <Popup>
                <div>{pdv.nbReleve} relevés à faire</div>
              </Popup>
              <Tooltip permanent={true} direction="top">
                <span>
                  n°{i + 1} {pdv.enseigne}
                </span>
              </Tooltip>
            </Marker>
          ))}
        </Map>
      </>
    );
  }
}
