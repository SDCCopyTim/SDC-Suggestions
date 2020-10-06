import React from 'react';
import Camp from './Camp.jsx';

const CampList = (props) => (
  <div className="show-listing suggested-camps" id="suggested-camps">
    <div className="container saved-lists-container">
      <div className="header">
        <div className="title">
          <h3>Campers also viewed</h3>
        </div>
      </div>
      <div className="row">
        {props.camps.map((camp, index) => <Camp key={index} camp={camp} />)}
      </div>
    </div>
  </div>
);

export default CampList;
