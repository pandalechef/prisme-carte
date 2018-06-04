import React from "react";
import { Map, Marker, TileLayer, Tooltip } from "react-leaflet";

interface IPdvsInterface {
  pdvs: Array<{
    enseigne: string;
    adresse: string;
    lat: number;
    lng: number;
  }>;
  positionCentre: [number, number];
}

interface IState {
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

  constructor(props: IPdvsInterface) {
    super(props);
    this.state = {
      lat: this.props.positionCentre[0],
      lng: this.props.positionCentre[1]
    };
    this.handleClick = this.handleClick.bind(this);
  }

  public getPosition(options: PositionOptions) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  public handleClick() {
    this.getPosition(this.options).then((p: Position) => {
      this.setState({ lat: p.coords.latitude, lng: p.coords.longitude });
    });
  }

  public render() {
    const position: [number, number] = [this.state.lat, this.state.lng];
    return (
      <>
        <button onClick={this.handleClick}>Actualiser la position</button>
        <Map center={position} zoom={17}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={{ lat: this.state.lat, lng: this.state.lng }}>
            <Tooltip permanent={true} direction="top">
              <span>Je suis là</span>
            </Tooltip>
          </Marker>
          {this.props.pdvs.map((pdv, i) => (
            <Marker key={i} position={{ lat: pdv.lat, lng: pdv.lng }}>
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
