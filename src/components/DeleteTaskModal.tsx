import axios from 'axios';
import React, {useState, useEffect} from 'react'
import {
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

import { useAppSelector, useAppDispatch } from '../app/hooks'
import { setTrue, setFalse } from '../features/updateList/updateSlice'

import { Editable } from './TodoItem';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

//axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
//axios.defaults.xsrfCookieName = "csrftoken";

function DeleteTaskModal({id}: Editable) {
    const {isOpen, onOpen, onClose} = useDisclosure();

    const needUpdateState = useAppSelector((state) => state.needUpdate.condition)
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        axios
        .delete(`/api/todos/${id}`)
        .finally(() => {
            dispatch(setTrue())
            onClose()
        })
    }

  return (
    <>
        <Button colorScheme='red' onClick={onOpen}>Delete</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Delete Task</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Are you sure you want to delete this task?
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='red' mr={3} onClick={(e) => {handleDelete()}}>
                        Remove Post
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
  );
}

export default DeleteTaskModal