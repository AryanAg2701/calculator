import React, { useState } from "react"
import "./Calculator.css"
import { create, all } from 'mathjs'

const math = create(all, {})

function Calculator() {

    const [value, setval] = useState('')
    const [operation, setopr] = useState('')
    const [error, seterr] = useState('')

    const clicking = (val) => {
        setval(value + val)
    }
    const specialopr = (op) => {
        setopr(op)
        setval(value+op)
    }

    const equals = () => {
        try {
            let result
            let ans
            if (operation === '√') {
                const tokens = value.split('√')
                result = math.sqrt(math.evaluate(tokens[1])).toString()
                ans=math.evaluate(tokens[0]+result)
            }
            if (operation === 'ln') {
                const tokens = value.split('ln')
                result = math.log(math.evaluate(tokens[1]),'2.718281828459').toString()
                ans=math.evaluate(tokens[0]+result)
            }
            if (operation === 'log') {
                const tokens = value.split('log')
                result = math.log(math.evaluate(tokens[1]),'10').toString()
                ans=math.evaluate(tokens[0]+result)
            }
                
            if (operation === 'd/dx') {
                const tokens = value.split('d/dx')
                const expr = tokens[1].trim()
                result = math.derivative(expr, 'x').toString()
                let a = tokens[0].charAt(tokens[0].length - 1)
                if(tokens[0]!=='') {
                ans=math.evaluate(tokens[0].slice(0, -1))+a+result 
                }
                else{
                    ans=result
                }
            }
            if (value.includes('^')&&!value.includes('x')) {
                const tokens = value.split('^')
                const base = math.evaluate(tokens[0])
                const exponent = math.evaluate(tokens[1])
                result = math.pow(base, exponent).toString()
                ans=tokens[0]+result
            }
            if(operation !=='d/dx'&&operation !=='√'&&operation !=='^'&&operation !=='ln'&&operation!=="log"){
            ans = math.evaluate(value)
            }
            setval(ans.toString())
            setopr('')
            seterr('')
        } catch (err) {
            seterr('Invalid Expression')
        }
    }

    return (
        <div className="calculator">
            <div id="display">
                {value || ''}
                {error && <div className="error">{error}</div>}
            </div>
            <div className="buttons">
                <button onClick={() => setval('')}>AC</button>
                <button onClick={() => setval(value.slice(0, -1))}>←</button>
                <button onClick={() => clicking('/')}>/</button>
                <button onClick={() => clicking('*')}>*</button>
                <button onClick={() => clicking('7')}>7</button>
                <button onClick={() => clicking('8')}>8</button>
                <button onClick={() => clicking('9')}>9</button>
                <button onClick={() => clicking('-')}>-</button>
                <button onClick={() => clicking('4')}>4</button>
                <button onClick={() => clicking('5')}>5</button>
                <button onClick={() => clicking('6')}>6</button>
                <button onClick={() => clicking('+')}>+</button>
                <button onClick={() => clicking('1')}>1</button>
                <button onClick={() => clicking('2')}>2</button>
                <button onClick={() => clicking('3')}>3</button>
                <button onClick={() => clicking('x')}>x</button>
                <button onClick={equals}>=</button>
                <button onClick={() => clicking('0')}>0</button>
                <button onClick={() => specialopr('d/dx')}>d/dx</button>
                <button onClick={() => specialopr('ln')}>ln</button>
                <button onClick={() => specialopr('log')}>log</button>
                <button onClick={() => specialopr('√')}>√</button>
                <button onClick={() => clicking('^')}>^</button>
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
    )
}

export default Calculator
