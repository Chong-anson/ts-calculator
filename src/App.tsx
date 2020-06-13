import React, { useState, useEffect } from 'react';
import './App.css';
import { Modal } from "./Modal"
import { setGlobalState } from "react-global-state-hook"

function App() {
  const [value, setValue] = useState(""); // return an array obj

  const changeValue = (e) => {
    if (value.length === 0 && e.target.innerText.match(/[+\-×÷]/)) {
      return 
    }

    if ((value[value.length - 1] + e.target.innerText).match(/[+\-×÷]{2}/)) {
      let newValue: string = value.slice(0, value.length - 1);
      newValue += e.target.innerText; 
      setValue(newValue)
    } else {
      setValue(value + e.target.innerText)
    }
  }

  const calculate = (e) => {
    const number: any[] = value.split(/[+\-×÷]/).map(el => parseFloat(el))
    const operator: string[] = value.split(/[0-9\.]+|/).slice(1, number.length);
    let ans: any[] = [number[0]]
    let i = 0

    if (value[0] === "-") {
      number.shift()
      number[0] *= -1;
      operator.pop()
      ans = [number[0]]
    }

    while (i < operator.length) {
      console.log(operator[i])
      if (operator[i].match(/[×÷]/)) {
        let prev: any = ans.pop()
        operator[i] === "×" ? ans.push(prev * number[i+1]) : ans.push(prev/number[i+1])
      } else {
        ans.push(number[i+1])
      }
      i++;
    } 
    
    let j = 1;
    for (let i = 0; i < operator.length; i++) {
      if (operator[i].match(/[+\-]/)) {
        operator[i] === '+' ? ans[j] += ans[j-1] : ans[j] = ans[j-1] - ans[j]
        j++
      }
    }
    setValue(ans[ans.length - 1].toString())

  }
  // useEffect(callback, [])
  useEffect(() => {
    setGlobalState('modal', 'open')
  }, [])

  return (
    <> 
      <div className="calculator">
        <div className="display">{value}</div>
        <div onClick={changeValue}>+</div>
        <div onClick={changeValue}>-</div>
        <div onClick={changeValue}>&times;</div>
        <div onClick={changeValue}>&divide;</div>
        <div onClick={changeValue}>7</div>
        <div onClick={changeValue}>8</div>
        <div onClick={changeValue}>9</div>
        <div onClick={changeValue}>4</div>
        <div onClick={changeValue}>5</div>
        <div onClick={changeValue}>6</div>
        <div onClick={changeValue}>1</div>
        <div onClick={changeValue}>2</div>
        <div onClick={changeValue}>3</div>
        <div onClick={changeValue}>0</div>
        <div onClick={changeValue}>.</div>
        <div className="equal" onClick={calculate}>=</div>
        <div onClick={e => setValue('') }>C</div>  
      </div>
      <Modal />
    </>
  );
}

export default App;
