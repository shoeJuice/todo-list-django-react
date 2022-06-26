import axios from 'axios'
import React, {useState, useEffect} from 'react'
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

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { setTrue } from '../features/updateList/updateSlice'
import { filterTrue } from '../features/updateList/filterChange'

import type {Editable} from './TodoItem'

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

function EditTaskModal({id}: Editable) {
    const {isOpen, onOpen, onClose} = useDisclosure()
    
    const [title, setTitle] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [isCompleted, setIsCompleted] = useState<boolean>()

    const currentList = useAppSelector((state) => state.trackList.currentList)
    const dispatch = useAppDispatch();

    const handleEdit = (task: {}) => {
        axios
        .put(`/api/todos/${id}/`, task)
        .finally(() => {
            console.log("This should print.")
            dispatch(setTrue())
            dispatch(filterTrue())
            onClose()
        })
    }

    useEffect(() => {
        let currentItem = currentList.find((item) => item.id === id)
        if(currentItem === undefined){
            console.log(`Item at ${id} does not exist. Closing modal.`)
            dispatch(setTrue())
            onClose()
        }
        setIsCompleted(currentItem?.isCompleted)
        setTitle(currentItem?.title)
        setDescription(currentItem?.description)
    }, [id])

  return (
    <>
        <Button colorScheme='gray' onClick={onOpen}>Edit</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Task</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <VStack
                            alignItems='left'
                        >
                            <>
                                <FormLabel>Title</FormLabel>
                                <Input id='title' placeholder={title ? title : ""} onChange={(e) => {setTitle(e.target.value)}} />
                                <FormHelperText>Input the title of the task here</FormHelperText>
                            </>
                            <>
                                <FormLabel>
                                    <Textarea id='description' placeholder={description ? description : ""} resize='none' onChange={(e) => {setDescription(e.target.value)}} />
                                </FormLabel>
                            </>
                            <>
                                <Checkbox colorScheme='green' isChecked={isCompleted} onChange={(e) => {setIsCompleted(!isCompleted)}}>Completed</Checkbox>
                            </>
                        </VStack>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='green'mr={3} onClick={(e) => {
                        let editedTask = {title: title, description: description, isCompleted: isCompleted}
                        handleEdit(editedTask)
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

export default EditTaskModal