import React from 'react';
import Camp from './Camp.jsx';

const CampList = (props) => {
  // Camp-mapping function (m x n matrix)
  var mapCamps = (rowCount, colCount) => {
    var rows = [];
    for (var i = 0; i < rowCount; i++) {
      var row = [];
      for (var j = 0; j < colCount; j++) {
        row.push(<Camp key={j + (colCount * i)} camp={props.camps[j + (colCount * i)]} />);
      }
      rows.push(<div key={i}>{row}</div>);// row === [<Camp/>, <Camp/>, <Camp/>]
    }
    return rows;
  }

  return (
    <div>
      {mapCamps(3, 3)}
      {/* [
        [<Camp/>, <Camp/>, <Camp/>],
        [<Camp/>, <Camp/>, <Camp/>],
        [<Camp/>, <Camp/>, <Camp/>]
      ]*/}
    </div>
  )
}

export default CampList;
