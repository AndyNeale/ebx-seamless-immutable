import React, { Component } from 'react';
import Item from './Item.jsx';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      items: [],
    }
    this.addItem = this.addItem.bind(this);
    this.onStop = this.onStop.bind(this);
  }

  addItem(state) {
    const now = new Date().toLocaleTimeString();
    const item = {
      title: 'Andy Writes Terrible Code',
      published: `26 June 2017 at ${now}`,
      loading: true,
      id: state.id,
    };
    return {
      items: state.items.concat(item),
      id: state.id + 1,
    };
  }

  setLoaded(index) {
    return function update(state) {
      const updated = [].concat(state.items);
      updated[index].loading = false;
      return {
        items: updated,
      };
    }
  }

  componentDidMount() {
    window.intervals = {};
    window.intervals.add = setInterval(() => {
      this.setState(this.addItem);
    }, 1000);

    window.intervals.load = setInterval(() => {
      const index = Math.floor(Math.random() * this.state.id);
      this.setState(this.setLoaded(index));
    }, 2000);
  }

  onStop() {
    window.clearInterval(window.intervals.add);
    window.clearInterval(window.intervals.load);
  }

  render() {
    return (
      <div className="App">
        {this.state.items.map(item => <Item {...item} />)}
        <div><a onClick={this.onStop}>STOP</a></div>
      </div>
    );
  }
}

export default App;
