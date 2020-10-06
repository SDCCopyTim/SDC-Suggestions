import React from 'react';
import List from './List.jsx';

const Lists = (props) => {
  const { lists } = props;
  return (
    <div>
      <h3 className="header">Lists including [CURRENT CAMP]</h3>
      {lists.map((list, index) => <List key={index} list={list} />)}
    </div>
  );
};

export default Lists;
