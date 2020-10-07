import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Map from './components/Map.jsx';
import CampList from './components/CampList.jsx'; // "Campers also viewed" list
import Footer from './components/Footer.jsx';

// App contains CampList
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      camp: {}, // current camp
      alsoViewed: [], // camp datas for "Campers also viewed"
    };
    this.getCamp = this.getCamp.bind(this);
    this.getAlsoViewed = this.getAlsoViewed.bind(this);
  }

  componentDidMount() {
    this.getCamp();
  }

  getCamp() {
    axios.get('http://localhost:3005/api/camp')
      .then((results) => {
        this.setState({
          camp: results.data[0],
        });
      })
      .then(this.getAlsoViewed)
      .catch((err) => {
        console.error(err);
      });
  }

  getAlsoViewed() {
    axios.get('http://localhost:3005/api/camps')
      .then((results) => {
        this.setState({
          alsoViewed: results.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const { camp, alsoViewed } = this.state;
    return (
      <div>
        <Map camp={camp} />
        <div className="suggestions" id="suggested-listings-section">
          <CampList camps={alsoViewed} />
        </div>
        <Footer />
        <div className="hc-love-message">
          <div className="message-container">Timcamp is created with  ❤️ and hope for our future</div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('suggestion'));
