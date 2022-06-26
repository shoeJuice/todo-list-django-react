import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    VStack,
    Textarea,
} from '@chakra-ui/react'

import { useAppSelector, useAppDispatch } from '../app/hooks'
import { setTrue } from '../features/updateList/updateSlice'

import { Editable } from './TodoItem'
import { RootState } from '../app/store'

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

function AddTaskModal() {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [description, setDescription] = useState<string>()
  const [title, setTitle] = useState<string>()

  const condition = useAppSelector((state) => state.needUpdate.condition)
  const dispatch = useAppDispatch();

  useEffect(() => {console.log("Condition is", condition)}, [condition])

  const createTask = (task: {}) => {
    axios
    .post("/api/todos/", task)
    .finally(() => {
        dispatch(setTrue())
        onClose()
    })
  }

  return (
    <>
        <Button marginBottom={10} colorScheme='purple' onClick={onOpen}>Add Task</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Task</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <VStack
                            alignItems='left'
                        >
                            <>
                                <FormLabel>Title</FormLabel>
                                <Input id='title' onChange={(e) => {setTitle(e.target.value)}} />
                                <FormHelperText>Input the title of the task here</FormHelperText>
                            </>
                            <>
                                <FormLabel>
                                    <Textarea id='description' placeholder='Description' resize='none' onChange={(e) => {setDescription(e.target.value)}} />
                                </FormLabel>
                            </>
                        </VStack>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='green'mr={3} onClick={(e) => {
                        let newTask = {title: title, description: description, isCompleted: false}
                        createTask(newTask)
                    }}>Submit</Button>
                    <Button colorScheme='red' mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
  )
}

export default AddTaskModal