import axios from 'axios'
import React, {useEffect, useState} from 'react';
import {Text, Flex, VStack, StackDivider} from '@chakra-ui/react'
import { useAppSelector, useAppDispatch } from './app/hooks';
import {setTrue, setFalse} from './features/updateList/updateSlice'

import logo from './logo.svg';
import './App.css';
import TodoItem from './components/TodoItem'
import TodoListContainer from './components/TodoListContainer';

interface APIResponse{
  id: number,
  title: string,
  description: string,
  isCompleted: boolean,
}

function App(){

  const [todoList, setTodoList] = useState<APIResponse[]>([])
  const needUpdateState = useAppSelector((state) => state.needUpdate.condition)
  const dispatch = useAppDispatch();

  const refreshList = () => {
    axios
    .get("/api/todos/")
    .then((res) => setTodoList(res.data))
    .catch((err) => console.log(Error(err.message)))
  }
  useEffect(() => {
    refreshList()
    console.log(todoList)
    dispatch(setFalse())
  }, [(needUpdateState == true)])
  useEffect(() => {
    "Need Update!"
  }, [needUpdateState])
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
          {todoList.map((item, key) => {return(<TodoItem key={key} id={item.id} title={item.title} description={item.description} isCompleted={item.isCompleted}/>)})}
        </VStack>
      </TodoListContainer>
    </div>
  );
}

export default App;
