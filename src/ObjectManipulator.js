class ObjectManipulator {
  constructor( { object, fetchObject, markResettable, updateMessage, updateStateValue } ) {
    this.fetchObject = fetchObject;
    this.markResettable = markResettable;
    this.updateMessage = updateMessage;
    this.updateStateValue = updateStateValue;
  }

  changeAttribute = ( object, attribute, value ) => {
    const newObject = { ...object, [attribute]: value };
    this.fetchObject(newObject);
    this.updateMessage(`You changed the ${attribute} to ${value}!`);
    this.markResettable();
    this.updateStateValue(attribute, value);
  };

  changeSide = ( object, side ) => {
    const newObject = { ...object, side };
    this.fetchObject(newObject);
    this.updateMessage(`You changed the sides to ${side} pixels!`);
    this.markResettable();
    this.updateStateValue('side', side);
  };

}

export default ObjectManipulator;
