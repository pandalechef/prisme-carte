import React from "react";
import { Map, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";

export default class SimpleExample extends React.Component {
  public state = {
    lat: 48.81645,
    lng: 2.308,
    zoom: 18
  };

  public render() {
    const position: [number, number] = [this.state.lat, this.state.lng];

    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <span>
              A pretty CSS3 popup. <br /> Easily customizable.
            </span>
          </Popup>
          <Tooltip permanent={true}>
            <span>Coucou</span>
          </Tooltip>
        </Marker>
      </Map>
    );
  }
}
