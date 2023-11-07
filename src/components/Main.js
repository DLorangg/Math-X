//Importaciones
import React, { Component } from 'react';
import * as math from 'mathjs';
import keyboardSvg from '../assets/keyboard-solid.svg';

//Definicion del objeto Calculator
class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      result: '', //Valor vacio al resultado
      showKeyboard: false,
      cursorPosition: 0,
    };
  }

  handleInputChange = (e) => {
    const inputValue = e.target.value;
    // Usar una expresión regular para permitir solo dígitos y caracteres matemáticos (+, -, *, /)
    const sanitizedInput = inputValue.replace(/[^0-9+\-*/]/g, '');
    this.setState({ input: sanitizedInput });
  }

  //Usando la libreria mathjs para calcular
  handleCalculate = () => {
    try {
      const result = math.evaluate(this.state.input);
      this.setState({ result });
    } catch (error) {
      this.setState({ result: 'Error' });
    }
  }

  //Funcion para mostrar y ocultar teclado
  toggleKeyboard = () => {
    this.setState({ showKeyboard: !this.state.showKeyboard });
  }

  //Guardar posicion en input
  appendSymbol = (symbol) => {
    const { input, cursorPosition } = this.state;
    const updatedInput = input.slice(0, cursorPosition) + symbol + input.slice(cursorPosition);
    this.setState({
      input: updatedInput,
      cursorPosition: cursorPosition + 1,
    });
  }

  //Mover cursor a la izquierda
  moveCursorLeft = () => {
    this.setState((prevState) => ({
      cursorPosition: Math.max(prevState.cursorPosition - 1, 0),
    }));
  }

  //Mover cursor a la derecha
  moveCursorRight = () => {
    this.setState((prevState) => ({
      cursorPosition: Math.min(prevState.cursorPosition + 1, prevState.input.length),
    }));
  }

  //Borrar caracter
  deleteCharacter = () => {
    const { input, cursorPosition } = this.state;
    if (cursorPosition > 0) {
      const updatedInput = input.slice(0, cursorPosition - 1) + input.slice(cursorPosition);
      this.setState({
        input: updatedInput,
        cursorPosition: cursorPosition - 1,
      });
    }
  }

  render() {
    const { input, showKeyboard, cursorPosition } = this.state;

    return (
      <div className='main'>
        <div className='input-container'>
          <input
            placeholder='Ingrese un problema matemático'
            value={input}
            onChange={this.handleInputChange}
          />
          <button className="keyboard" onClick={this.toggleKeyboard}>
            <img src={keyboardSvg} alt="Teclado" />
          </button>
        </div>
        {showKeyboard && (
          <div className='keyboard-container'>
            <button onClick={() => this.appendSymbol('1')}>1</button>
            <button onClick={() => this.appendSymbol('2')}>2</button>
            <button onClick={() => this.appendSymbol('3')}>3</button>
            <button onClick={() => this.appendSymbol('4')}>4</button>
            <button onClick={() => this.appendSymbol('5')}>5</button>
            <button onClick={() => this.appendSymbol('6')}>6</button>
            <button onClick={() => this.appendSymbol('7')}>7</button>
            <button onClick={() => this.appendSymbol('8')}>8</button>
            <button onClick={() => this.appendSymbol('9')}>9</button>
            <button onClick={() => this.appendSymbol('0')}>0</button>
            <button onClick={() => this.appendSymbol('+')}>+</button>
            <button onClick={() => this.appendSymbol('-')}>-</button>
            <button onClick={() => this.appendSymbol('*')}>*</button>
            <button onClick={() => this.appendSymbol('/')}>/</button>
            <button onClick={this.moveCursorLeft}>{'<'}</button>
            <button onClick={this.moveCursorRight}>{'>'}</button>
            <button onClick={this.deleteCharacter}>Borrar</button>
          </div>
        )}
        <button className="resolver" onClick={this.handleCalculate}>Resolver</button>
        {this.state.result && (
          <p className='result'>Resultado: {this.state.result}</p>
        )}
      </div>
    );
  }
}

export default Calculator;
