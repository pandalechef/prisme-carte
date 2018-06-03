import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

export default class AnimateExample extends Component {
  public state = {
    animate: false,
    hasLocation: true,
    latlng: {
      lat: 51.505,
      lng: -0.09
    }
  };

  public handleClick = () => {
    // tslint:disable-next-line:no-console
    console.log('clic!');
  };

  public toggleAnimate = () => {
    this.setState({
      animate: !this.state.animate
    });
  };

  public render() {
    const marker = this.state.hasLocation ? (
      <Marker position={this.state.latlng}>
        <Popup>
          <span>You are here</span>
        </Popup>
      </Marker>
    ) : null;

    return (
      <div style={{ textAlign: 'center' }}>
        <label>
          <input
            checked={this.state.animate}
            onChange={this.toggleAnimate}
            type="checkbox"
          />
          Animate panning
        </label>
        <Map
          animate={this.state.animate}
          center={this.state.latlng}
          length={4}
          onClick={this.handleClick}
          zoom={13}
        >
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {marker}
        </Map>
      </div>
    );
  }
}
