import React, {useState, useEffect} from 'react'

import {
    Box,
    Text, 
    Button, 
    Flex, 
    ComponentWithAs,
    TextProps,
    HStack,
    Tag,
    Tooltip
} from '@chakra-ui/react'
import DeleteTaskModal from './DeleteTaskModal';
import EditTaskModal from './EditTaskModal';

type TodoItemProps = {
    id: number,
    title: string,
    description: string,
    isCompleted: boolean,
    date?: Date,
    isSelected?: boolean,
}

interface APIResponse{
    id: number,
    title: string,
    description: string,
    isCompleted: boolean,
}

type HoverableProps = {
    title: string
}


interface Editable{
    id: number
}


/**
 * 
 * Functional component representing a singular TodoItem.
 */
function TodoItem(props : TodoItemProps){

    const [itemId, setItemId] = useState<number>(0)
    const [itemTitle, setItemTitle] = useState<string>()
    const [itemDescription, setItemDescription] = useState<string>()
    const [isCompleted, setIsCompleted] = useState<boolean>()

    useEffect(() => {
        setItemId(props.id);
        setItemTitle(props.title);
        setItemDescription(props.description);
    }, [])

    return(
        <Flex
            flexDirection="row"
            justifyContent='space-between'
            paddingX={5}
            paddingY={2}
            alignItems='center'
        >
            <Tooltip hasArrow label={props.description}>
                <Text css={`cursor: default;`}>
                    {props.title}
                </Text>
            </Tooltip>
            <HStack>
                <EditTaskModal id={props.id}/>
                <DeleteTaskModal id={props.id}/>
            </HStack>
        </Flex>
    );
}

export default TodoItem
export type {Editable, APIResponse}
