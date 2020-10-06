import React from 'react';

const Map = (props) => {
  let { camp } = props;
  return (
    <div className="wide-map" id="location-section">
      <div className="map">
        <iframe className="google-map" title="google-map" src={camp.map_url} width="100%" height="450" frameBorder="0" style={{ border: 0 }} allowFullScreen="" aria-hidden="false" tabIndex="0" />
        <div className="tile-container">
          <div className="container">
            <div className="tile">
              <dl className="dl-horizontal">
                <dt>Property</dt>
                <dd><a>{camp.property}</a></dd>
                <dt>State</dt>
                <dd><a>{camp.state}</a></dd>
                <dt>Country</dt>
                <dd><a>United States</a></dd>
              </dl>
              <dl className="dl-horizontal">
                <dt>$80/night</dt>
                <dd>1 Site</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Map;
