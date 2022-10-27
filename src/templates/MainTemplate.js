import React, { useContext} from 'react'
import { Button, Container, Flex, Heading, Text, useDisclosure } from '@chakra-ui/react'
import ShiftTable from '../components/ShiftTable'
import Modal from '../components/Modal'
import StoreContext from '../utils/StoreContext'

export default function MainTemplate() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { shiftList, nurseList } = useContext(StoreContext)

    if (shiftList.error || nurseList.error) {
        return (
                <Flex alignItems='center' direction='column' justify='center' my='auto' h='100vh'>
                    <Heading as="h1" fontSize={60}>Oh no, <br></br> something happened 🥵</Heading>
                    <Button onClick={() => window.location.reload()} mt={5} mx='auto' size='lg'>Quick Reload!</Button>
                </Flex>
        )
    }

    return (
        <Container maxWidth='none'  width='100%'>
            <Flex justify='space-between'>
                <Heading as='h1' size='xl' color='gray.800' mt='10' mb='10' >connectRN Shift Scheduler</Heading>
                <Button  my={8} onClick={onOpen} size='lg'>Set Shift Assignment</Button>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} title='Set Shift Assignment' />
            <ShiftTable />
        </Container>
    )
}