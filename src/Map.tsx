import React from "react";
import { Map, Marker, TileLayer, Tooltip } from "react-leaflet";

interface IPdvsInterface {
  pdvs: Array<{
    enseigne: string;
    adresse: string;
    lat: number;
    lng: number;
  }>;
}

// tslint:disable-next-line:no-empty-interface
interface IState {}

export default class SimpleExample extends React.Component<
  IPdvsInterface,
  IState
> {
  public state = {
    lat: 48.8155,
    lng: 2.317,
    zoom: 17
  };

  public render() {
    const position: [number, number] = [this.state.lat, this.state.lng];

    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
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
    );
  }
}
