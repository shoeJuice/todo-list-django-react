import axios from 'axios'
import React, {useEffect, useState} from 'react';
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
  const needFilter = useAppSelector((state) => state.filterUpdate.condition)

  const [todoList, setTodoList] = useState<APIResponse[]>([])

  
  const dispatch = useAppDispatch();

  const refreshList = () => {
    axios
    .get("/api/todos/")
    .then((res) => {
      dispatch(setCurrent(res.data))
    })
    .catch((err) => console.log(Error(err.message)))
  }

  useEffect(() => {
    refreshList()
    dispatch(setFalse())
    let tempList = currentList.filter((item) => item.isCompleted == viewCompleted)
    setTodoList(tempList)
  }, [(needUpdate == true), currentList])

 useEffect(() => {
    let tempList = currentList.filter((item) => item.isCompleted == viewCompleted)
    setTodoList(tempList)
  }, [(viewCompleted), (needFilter == true)]) 
  

  
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
          {todoList.map((item, key) => {return(<TodoItem key={key} id={item.id} title={item.title} description={item.description} isCompleted={item.isCompleted}/>)})}
        </VStack>
      </TodoListContainer>
    </div>
  );
}

export default App;
