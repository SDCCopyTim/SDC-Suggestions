import React from 'react';
import ReactDOM from 'react-dom';
import CampList from './components/CampList.jsx'; // "Campers also viewed" list

// App contains CampList
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alsoViewed: [1, 2, 3, 4, 5, 6, 7, 8, 9] // array of camp datas for "Campers also viewed": [{Camp Schema}, {Camp Schema}, {Camp Schema}]
    };
  }

  render() {
    return (
      <div>
        <h2>Campers also viewed</h2>
        <CampList camps={this.state.alsoViewed} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));