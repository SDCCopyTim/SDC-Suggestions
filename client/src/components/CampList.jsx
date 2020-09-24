import React from 'react';
import Camp from './Camp.jsx';

const CampList = (props) => {
  var rows = [];
  for (var i = 0; i < 3; i++) {
    var row = [];
    for (var j = 0; j < 3; j++) {
      row.push(<Camp key={j + (3 * i)} camp={props.camps[j + (3 * i)]}/>);
    }
    rows.push(<div key={i}>{row}</div>);// row === [<Camp/>, <Camp/>, <Camp/>]
  }
  return (
    <div>
      {rows}
      {/* [
        [<Camp/>, <Camp/>, <Camp/>],
        [<Camp/>, <Camp/>, <Camp/>],
        [<Camp/>, <Camp/>, <Camp/>]
      ]*/}
    </div>
  )
}

export default CampList;