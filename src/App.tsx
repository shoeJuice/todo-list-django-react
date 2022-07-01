import axios from 'axios'
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Text, Flex, VStack, StackDivider} from '@chakra-ui/react'
import { useAppSelector, useAppDispatch } from './app/hooks';
import {setTrue, setFalse} from './features/updateList/updateSlice'
import {filterTrue, filterFalse} from './features/updateList/filterChange'
import { setCurrent } from './features/updateList/trackSlice';

import logo from './logo.svg';
import './App.css';
import TodoItem from './components/TodoItem'
import TodoListContainer from './components/TodoListContainer';

import type {APIResponse} from './components/TodoItem'

function App(){

  const needUpdate = useAppSelector((state) => state.needUpdate.condition)
  const viewCompleted = useAppSelector((state) => state.viewComplete.condition)
  const currentList = useAppSelector((state) => state.trackList.currentList)

  const [todoList, setTodoList] = useState<APIResponse[]>([])
  
  const dispatch = useAppDispatch();
  const refreshList = useRef(() => {})
  refreshList.current = () => {
    axios
    .get("/api/todos/")
    .then(({data}) => {
      dispatch(setCurrent(data))
    })
    .catch((err) => console.log(Error(err.message)))
  }
  useEffect(() => {
    refreshList.current()
    dispatch(setFalse())
    setTodoList(currentList)
  }, [(needUpdate == true), currentList.length])
  
  return (
    <div className="App">
      <Text
        textAlign='center'
        color='white'
        marginBottom={10}
        fontSize='6xl'
        fontWeight='semibold'
      >
        Todo List
      </Text>
      <TodoListContainer>
        <VStack
          alignItems='space-between'
          divider={<StackDivider borderColor='blackAlpha.100' />}
        >
          {todoList.map((item, key) => { if(item.isCompleted == viewCompleted) return(<TodoItem key={key} id={item.id} title={item.title} description={item.description} isCompleted={item.isCompleted}/>)})}
        </VStack>
      </TodoListContainer>
    </div>
  );
}

export default App;
