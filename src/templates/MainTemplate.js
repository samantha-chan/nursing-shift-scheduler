import React from 'react'
import { Button, Container, Flex, Heading, useDisclosure } from '@chakra-ui/react'
import ShiftTable from '../components/ShiftTable'
import Modal from '../components/Modal'

export default function MainTemplate() {
    const { isOpen, onOpen, onClose } = useDisclosure()

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