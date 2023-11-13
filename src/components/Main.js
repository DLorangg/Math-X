import React, { Component } from 'react';
import * as math from 'mathjs';  // Importa la librería math.js para cálculos matemáticos
import keyboardSvg from '../assets/keyboard-solid.svg';  // Importa imágenes para los botones del teclado
import arrowLeftSvg from '../assets/arrow-left-solid.svg';
import arrowRightSvg from '../assets/arrow-right-solid.svg';
import deleteSvg from '../assets/delete-left-solid.svg';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',          // Almacena la expresión matemática ingresada por el usuario
      result: '',         // Almacena el resultado del cálculo
      showKeyboard: false, // Indica si se debe mostrar el teclado virtual
      cursorPosition: 0,   // Almacena la posición del cursor en la entrada del usuario
    };
  }

  // Maneja el cambio en la entrada del usuario
  handleInputChange = (e) => {
    const inputValue = e.target.value;
    this.setState({ input: inputValue });
  }

  // Maneja el cálculo cuando se presiona el botón "Resolver"
  handleCalculate = () => {
    try {
      // Reemplaza el símbolo de la raíz cuadrada por el formato adecuado para el cálculo
      const inputWithSqrt = this.state.input.replace(/√([0-9.]+)/g, 'sqrt($1)');
      
      // Calcular el resultado utilizando math.js
      const result = math.evaluate(inputWithSqrt);

      // Mostrar el resultado
      this.setState({ result });
    } catch (error) {
      this.setState({ result: 'Error' });
    }
  }

  // Muestra u oculta el teclado virtual
  toggleKeyboard = () => {
    this.setState({ showKeyboard: !this.state.showKeyboard });
  }

  // Agrega un símbolo en la posición del cursor en la entrada del usuario
  appendSymbol = (symbol) => {
    const { input, cursorPosition } = this.state;
    const updatedInput = input.slice(0, cursorPosition) + symbol + input.slice(cursorPosition);
    this.setState({
      input: updatedInput,
      cursorPosition: cursorPosition + symbol.length,
    });
  }

  // Mueve el cursor a la izquierda en la entrada del usuario
  moveCursorLeft = () => {
    this.setState((prevState) => ({
      cursorPosition: Math.max(prevState.cursorPosition - 1, 0),
    }));
  }

  // Mueve el cursor a la derecha en la entrada del usuario
  moveCursorRight = () => {
    this.setState((prevState) => ({
      cursorPosition: Math.min(prevState.cursorPosition + 1, prevState.input.length),
    }));
  }

  // Borra un carácter en la posición del cursor en la entrada del usuario
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
    const { input, showKeyboard } = this.state;

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
            {/* Botones para números y operadores */}
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

            {/* Botones para funciones adicionales */}
            <button onClick={this.moveCursorLeft}>
              <img src={arrowLeftSvg} alt="Mover Izquierda" />
            </button>
            <button onClick={this.moveCursorRight}>
              <img src={arrowRightSvg} alt="Mover Derecha" />
            </button>
            <button onClick={this.deleteCharacter}>
              <img src={deleteSvg} alt="Borrar" />
            </button>
            <button onClick={() => this.appendSymbol('^')}>^</button>
            <button onClick={() => this.appendSymbol('√')}>√</button>
          </div>
        )}
        {/* Botón para calcular */}
        <button className="resolver" onClick={this.handleCalculate}>Resolver</button>
        
        {/* Muestra el resultado si está disponible */}
        {this.state.result && (
          <p className='result'>Resultado: <span className="result-value">{this.state.result}</span></p>
        )}
      </div>
    );
  }
}

export default Calculator;
