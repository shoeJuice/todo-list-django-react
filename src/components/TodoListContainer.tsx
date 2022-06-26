import React from 'react'
import {Box, Flex, Button, HStack, VStack, Divider} from '@chakra-ui/react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { viewAllIncomplete, viewAllComplete } from '../features/updateList/viewCompleteSlice'
import { filterTrue } from '../features/updateList/filterChange'
import AddTaskModal from './AddTaskModal'

type TodoListContainerProps = {
    children?: JSX.Element | JSX.Element[]
}

/**
 * The main component for the page, this container holds
 * Todo items, while providing extra functionality like
 * adding tasks and filtering through complete and incomplete
 * tasks.
 */
function TodoListContainer(props: TodoListContainerProps){

    const viewCompleted = useAppSelector((state) => state.viewComplete.condition)
    const dispatch = useAppDispatch();

    return(
        <Box
            backgroundColor='white'
            marginX='auto'
            textAlign='left'
            paddingX={5}
            paddingY={3}
            borderRadius={6}
        >
            <AddTaskModal />
            <HStack marginBottom={5}>
                <Button colorScheme='blackAlpha' variant='outline' onClick={(e) => {
                    dispatch(viewAllComplete())
                    dispatch(filterTrue())
                }}>Complete</Button>
                <Button colorScheme='blackAlpha' color='white' onClick={(e) => {
                    dispatch(viewAllIncomplete())
                    dispatch(filterTrue())
                    }}>Incomplete</Button>
            </HStack>
            <Divider orientation='horizontal' />
            {props.children}
        </Box>
    );
}

export default TodoListContainer;