import React, { Component } from 'react';
import { Row, Col, Button, Input, Label } from 'reactstrap';
import './App.css';
import object from './Object';
import ObjectManipulator from './ObjectManipulator';

class App extends Component {
  initialState = {
    repeat: object.repeat,
    side: object.side,
    text: object.text,
  };

  state = {
    ...this.initialState
  };

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

  updateMessage = message => this.setState({ message });
  markResettable = () => this.setState({ resettable: true });
  updateStateValue = ( field, value ) => this.setState({ [field]: value });

  clearValues = () => this.setState({ resettable: false, message: undefined, ...this.initialState });

  render() {
    const { message, object, objectArray, resettable, text, repeat, side } = this.state;
    const colors = ['blue', 'red', 'orange', 'aquamarine', 'green', 'gray', 'magenta'];

    const manipulator = new ObjectManipulator({
      object,
      fetchObject: this.fetchObject,
      markResettable: this.markResettable,
      updateMessage: this.updateMessage,
      updateStateValue: this.updateStateValue,
    });

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
                        onClick={() => manipulator.changeAttribute(object, 'color', color)}
                >{color}!</Button>
              ))}
            </div>
            <div>
              <Label style={{ margin: '5px' }}>
                How many boxes?
                <Input type='number' style={{ width: '200px' }} value={repeat}
                       onChange={e => manipulator.changeAttribute(object, 'repeat', e.target.value)}
                />
              </Label>
              <Label style={{ margin: '5px' }}>
                What text?
                <Input type='text' style={{ width: '200px' }} value={text}
                       onChange={e => manipulator.changeAttribute(object, 'text', e.target.value)}
                />
              </Label>
              <Label style={{ margin: '5px' }}>
                How many pixels to a side?
                <Input type='number' style={{ width: '200px' }} value={side}
                       onChange={e => manipulator.changeSide(object, e.target.value)}
                />
              </Label>
              {resettable && <Button color='danger' onClick={() => {
                this.fetchObject();
                this.clearValues();
              }}>
                X</Button>}
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
                     width: `${obj.side}px`,
                     height: `${obj.side}px`,
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
