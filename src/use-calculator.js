import { useState } from 'react';

export const useCalculator = () => {
  const [input, setInput] = useState(0);
  const [currentOperator, setCurrentOperator] = useState(null); //+
  const [result, setResult] = useState(null); // 12 -> 14
  const [tempInput, setTempInput] = useState(null); // 2
  const [tempOperator, setTempOperator] = useState(null); // +
  const [isClickedOperator, setIsClickedOperator] = useState(false); // +
  const [isClickedEqual, setIsClickedEqual] = useState(false); // +

  //input이 있으면 true 아니면 false
  //어떠한 값을 boolean으로 반환할때 !!

  const hasInput = !!input;

  const onPressNum = (num) => {
    //직전에 연산자가 들어간 경우
    if (currentOperator && isClickedOperator) {
      //이전에 입력 된 숫자
      setResult(input);
      //새로 입력된 숫자
      setInput(num);

      //연산자가 눌린 후 숫자가 들어왔기 때문에
      //직전에 들어오지 않았다~ == isClickedOperaotr === false 이기 때문에 false로 바꿔줌

      setIsClickedOperator(false);
    } else {
      //newInput 에 입력된 숫자를 모두 합쳐서 보여줌
      //두 숫자를 string으로 변환시켜서 합쳐준 뒤 다시 숫자현으로 변환 -> 맨 앞에 0이 스트링으로 오는 것을 막아줌
      const newInput = Number(`${input}${num}`);
      setInput(newInput);
    }
  };

  const onPressOperator = (operator) => {
    if (operator !== '=') {
      //들어온 연산자를 (= 제외) currentoperator에 담아줌
      setCurrentOperator(operator);
      //= 이 아닌 연산자가 들어올 떄 true로 setState
      setIsClickedOperator(true);
      //직전에 = 안눌렀슴
      setIsClickedEqual(false);
    } else {
      //마지막에 보여줄 숫자
      let finalResult = result;
      //직전에 =이 클릭 됐으면 tempInput을 finalInput으로 보냄
      const finalInput = isClickedEqual ? tempInput : input;
      //직전에 =이 클릭 됐으면 tempOperator finalOperator 보냄

      const finalOperator = isClickedEqual ? tempOperator : currentOperator;
      switch (finalOperator) {
        case '+':
          finalResult = result + finalInput;
          break;
        case '-':
          finalResult = result - finalInput;
          break;
        case '*':
          finalResult = result * finalInput;
          break;
        case '/':
          finalResult = result / finalInput;
          break;

        default:
          break;
      }
      //입풋 화면에 보여주는 마지막 숫자
      setInput(finalResult);
      // 새로운 숫자가 입력 되기전의 문자로 만들어 주기 위해 setState
      setResult(finalResult);

      setTempInput(finalInput);
      setTempOperator(finalOperator);
      setCurrentOperator(null);
      //직전에 = 누름
      setIsClickedEqual(true);
    }
  };
  const onPressReset = () => {
    if (hasInput) {
      setInput(0);
    } else {
      setInput(0);
      setResult(null);
      setCurrentOperator(null);
      setTempInput(null);
      setTempOperator(null);
    }
  };

  return {
    input,
    currentOperator,
    result,
    tempInput,
    tempOperator,
    hasInput,
    onPressNum,
    onPressOperator,
    onPressReset,
  };
};
