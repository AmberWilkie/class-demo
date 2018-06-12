import React, { Component } from 'react';
import { Row, Col, Button, Input, Label } from 'reactstrap';
import './App.css';
import object from './Object';

class App extends Component {
  state = {};

  componentDidMount() {
    this.fetchObject();
  }

  fetchObject = ( obj = object ) => {
    // In a real-world scenario, we might grab some data from an API
    const objectArray = [];
    for (let i = 0; i < obj.repeat; i++) {
      objectArray.push(obj);
    }

    this.setState({ object: obj, objectArray });
  };

  changeAttribute = ( attribute, value ) => {
    let obj = this.state.object;
    obj[attribute] = value;
    this.fetchObject(obj);
    this.setState({ message: `You changed the ${attribute} to ${value}!` });
  };

  changeSide = pixels => {
    let obj = this.state.object;
    obj.side = `${pixels}px`;
    this.fetchObject(obj);
    this.setState({ message: `You changed the sides to ${pixels} pixels!` });
  }

  render() {
    const { message, objectArray } = this.state;
    const colors = ['blue', 'red', 'orange', 'aquamarine', 'green', 'gray', 'magenta'];

    return (
      <Row className="App">
        <Col>
          <header className="App-header">
            <h1 style={{ color: 'white' }}>React Class Demo</h1>
            <div>
              {colors.map(color => (
                <Button key={color}
                        style={{
                          backgroundColor: color,
                          textTransform: 'uppercase',
                          margin: '5px'
                        }}
                        onClick={() => this.changeAttribute('color', color)}
                >{color}!</Button>
              ))}
            </div>
            <div>
              <Label style={{margin: '5px'}}>
                How many boxes?
                <Input type='number' style={{ width: '200px' }}
                       onChange={e => this.changeAttribute('repeat', e.target.value)}
                />
              </Label>
              <Label style={{margin: '5px'}}>
                What text?
                <Input type='text' style={{ width: '200px' }}
                       onChange={e => this.changeAttribute('text', e.target.value)}
                />
              </Label>
              <Label style={{margin: '5px'}}>
                How many pixels to a side?
                <Input type='number' style={{ width: '200px' }}
                       onChange={e => this.changeSide(e.target.value)}
                />
              </Label>
              {/* This doesn't work yet. The object itself has been edited. */}
              {(this.state.object !== object) && <Button color='danger'>X</Button>}
            </div>
            {message && <div>{message}</div>}
          </header>
          <div style={{ display: 'flex', flexWrap: 'wrap', margin: '5px' }}>
            {objectArray && objectArray.map(( obj, index ) => (
              <div key={index}
                   style={{
                     margin: '5px',
                     color: 'white',
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                     width: obj.side,
                     height: obj.side,
                     backgroundColor: obj.color
                   }}>
                <h2>{obj.text}</h2>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    );
  }
}

export default App;
