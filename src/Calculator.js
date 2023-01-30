import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import styled from 'styled-components/native';
import { useCalculator } from './use-calculator';

const COLOR = {
  RESULT: '#4e4c51',
  RESET: '#5f5e62',
  OPERATOR: '#f39c29',
  NUM: '#5c5674',
};

//BUTTON type: 'result' | 'operator' | 'num'

const Button = ({ text, onPress, flex, type, isSelected }) => {
  const backgroundColor =
    type === 'reset'
      ? COLOR.RESET
      : type === 'operator'
      ? COLOR.OPERATOR
      : type === 'num'
      ? COLOR.NUM
      : 'transparent';
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex,
        backgroundColor,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: isSelected ? 1 : 0.2,
        borderColor: 'black',
      }}
    >
      <Text style={{ fontSize: 25, color: 'white' }}>{text}</Text>
    </TouchableOpacity>
  );
};

const ButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

const InputContainer = styled.View`
  background-color: ${COLOR.RESULT};
  min-height: 50px;
  justify-content: center;
  align-items: flex-end;
  padding: 10px 5px;
`;

export default () => {
  const {
    input,
    currentOperator,
    result,
    tempInput,
    tempOperator,
    hasInput,
    onPressNum,
    onPressOperator,
    onPressReset,
  } = useCalculator();
  return (
    <View
      style={{
        flex: 1,
        width: 250,
        justifyContent: 'center',
        borderRadius: 16,
      }}
    >
      <View>
        <Text>input : {input}</Text>
      </View>
      <View>
        <Text>currentOperator : {currentOperator}</Text>
      </View>
      <View>
        <Text>result : {result}</Text>
      </View>
      <View>
        <Text>tempInput : {tempInput}</Text>
      </View>
      <View>
        <Text>tempOperator : {tempOperator}</Text>
      </View>

      {/* 결과 */}
      <InputContainer>
        <Text style={{ color: 'white', textAlign: 'right', fontSize: 25 }}>
          {input}
        </Text>
      </InputContainer>
      {/* [ac ~ /] */}
      <ButtonContainer>
        <Button type="reset" text="AC" onPress={onPressReset} flex={3}></Button>
        <Button
          type="operator"
          text="/"
          onPress={() => onPressOperator('/')}
          isSelected={currentOperator === '/'}
          flex={1}
        ></Button>
      </ButtonContainer>
      {/* [7 ~ x] */}
      <ButtonContainer>
        {[7, 8, 9].map((num, index) => (
          <Button
            key={index}
            type="num"
            text={`${num}`}
            onPress={() => onPressNum(num)}
            flex={1}
          ></Button>
        ))}

        <Button
          type="operator"
          text="*"
          onPress={() => onPressOperator('*')}
          isSelected={currentOperator === '*'}
          flex={1}
        ></Button>
      </ButtonContainer>
      {/* [4 ~ -] */}
      <ButtonContainer>
        {[4, 5, 6].map((num, index) => (
          <Button
            key={index}
            type="num"
            text={`${num}`}
            onPress={() => onPressNum(num)}
            flex={1}
          ></Button>
        ))}

        <Button
          type="operator"
          text="-"
          onPress={() => onPressOperator('-')}
          flex={1}
          isSelected={currentOperator === '-'}
        ></Button>
      </ButtonContainer>
      {/* [1 ~ +] */}
      <ButtonContainer>
        {[1, 2, 3].map((num, index) => (
          <Button
            key={index}
            type="num"
            text={`${num}`}
            onPress={() => onPressNum(num)}
            flex={1}
          ></Button>
        ))}
        <Button
          type="operator"
          text="+"
          onPress={() => onPressOperator('+')}
          isSelected={currentOperator === '+'}
          flex={1}
        ></Button>
      </ButtonContainer>
      {/* [0 ~ =] */}
      <ButtonContainer>
        <Button type="num" text="0" onPress={() => null} flex={3}></Button>
        <Button
          type="operator"
          text="="
          onPress={() => onPressOperator('=')}
          flex={1}
        ></Button>
      </ButtonContainer>
    </View>
  );
};
