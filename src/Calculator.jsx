import React, { useState } from "react"; // Import React and useState hook
import "./Calculator.css"; // stylesheet
import { create, all } from 'mathjs'; // math.js library

const math = create(all, {}); // Create an variable of math.js

function Calculator() {
    const [value, setval] = useState(''); // Input value 
    const [operation, setopr] = useState(''); // Current operation 
    const [error, seterr] = useState(''); // Error message 

    const clicking = (val) => {
        setval(value + val); // append clicked value to input
    };

    const specialopr = (op) => {
        setopr(op); // set current operation
        setval(value + op); // append operation to input
    };

    const equals = () => {
        try {
            let result;
            let ans;
            if (value.includes('^') && !value.includes('x')) {
                const tokens = value.split('^'); // Split input by '^'
                const base = math.evaluate(tokens[0]); // Evaluate base
                const exponent = math.evaluate(tokens[1]); // Evaluate exponent
                result = math.pow(base, exponent).toString(); // Calculate power
                ans = tokens[0] + result;
                setval(ans.toString());
            }
            if (operation === '√') {
                const tokens = value.split('√'); // Split input by '√'
                result = math.sqrt(math.evaluate(tokens[1])).toString(); // Calculate square root
                ans = math.evaluate(tokens[0] + result);
            }
            if (operation === 'ln') {
                const tokens = value.split('ln'); // Split input by 'ln'
                result = math.log(math.evaluate(tokens[1]), '2.718281828459').toString(); // Calculate natural log
                ans = math.evaluate(tokens[0] + result);
            }
            if (operation === 'log') {
                const tokens = value.split('log'); // Split input by 'log'
                result = math.log(math.evaluate(tokens[1]), '10').toString(); // Calculate log base 10
                ans = math.evaluate(tokens[0] + result);
            }
            if (operation === 'd/dx') {
                const tokens = value.split('d/dx'); // Split input by 'd/dx'
                const expr = tokens[1].trim();
                result = math.derivative(expr, 'x').toString(); // Calculate derivative
                let a = tokens[0].charAt(tokens[0].length - 1);
                ans = tokens[0] ? math.evaluate(tokens[0].slice(0, -1)) + a + result : result;//evaluate the part before 'd/dx'
            }
            if (!['d/dx', '√', '^', 'ln', 'log'].includes(operation)) {
                ans = math.evaluate(value); // Evaluate general expression
            }
            setval(ans.toString());
            setopr('');
            seterr('');
        } catch (err) {
            seterr('Invalid Expression'); // Set error message
        }
    };

    return (
        <div className="calculator">
            <div id="display">
                {value || ''}
                {error && <div className="error">{error}</div>}
            </div>
            <div className="buttons">
                <button onClick={() => setval('')}>AC</button> {/* Clear input */}
                <button onClick={() => setval(value.slice(0, -1))}>←</button> {/* Backspace */}
                <button onClick={() => clicking('/')}>/</button> {/* Division */}
                <button onClick={() => clicking('*')}>*</button> {/* Multiplication */}
                <button onClick={() => clicking('7')}>7</button>
                <button onClick={() => clicking('8')}>8</button>
                <button onClick={() => clicking('9')}>9</button>
                <button onClick={() => clicking('-')}>-</button> {/* Subtraction */}
                <button onClick={() => clicking('4')}>4</button>
                <button onClick={() => clicking('5')}>5</button>
                <button onClick={() => clicking('6')}>6</button>
                <button onClick={() => clicking('+')}>+</button> {/* Addition */}
                <button onClick={() => clicking('1')}>1</button>
                <button onClick={() => clicking('2')}>2</button>
                <button onClick={() => clicking('3')}>3</button>
                <button onClick={() => clicking('x')}>x</button>
                <button onClick={equals}>=</button> {/* Equals */}
                <button onClick={() => clicking('0')}>0</button>
                <button onClick={() => specialopr('d/dx')}>d/dx</button> {/* Derivative */}
                <button onClick={() => specialopr('ln')}>ln</button> {/* Natural log */}
                <button onClick={() => specialopr('log')}>log</button> {/* Log base 10 */}
                <button onClick={() => specialopr('√')}>√</button> {/* Square root */}
                <button onClick={() => clicking('^')}>^</button> {/* Power */}
                <button onClick={() => clicking('sin(')}>sin</button>
                <button onClick={() => clicking('cos(')}>cos</button>
                <button onClick={() => clicking('tan(')}>tan</button>
                <button onClick={() => clicking('.')}>.</button>
                <button onClick={() => clicking('(')}>(</button>
                <button onClick={() => clicking(')')}>)</button>
                <button onClick={() => clicking(math.pi)}>π</button>
                <button onClick={() => clicking(math.e)}>e</button>
            </div>
        </div>
    );
}

export default Calculator;
