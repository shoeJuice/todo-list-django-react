import React from 'react';
import {Text, Flex, VStack, StackDivider} from '@chakra-ui/react'

import logo from './logo.svg';
import './App.css';
import TodoItem from './components/TodoItem'
import TodoListContainer from './components/TodoListContainer';

function App(){
  return (
    <div className="App">
      <Text
        textAlign='center'
        color='white'
        marginBottom={5}
        fontSize='2xl'
        fontWeight='medium'
      >
        Todo List!
      </Text>
      <TodoListContainer>
        <VStack
          alignItems='space-between'
          divider={<StackDivider borderColor='blackAlpha.100' />}
        >
          
        </VStack>
      </TodoListContainer>
    </div>
  );
}

export default App;
