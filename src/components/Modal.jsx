import React, { useContext, useEffect, useState } from 'react'
import {
	Button,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Modal as ChakraModal,
	ModalBody,
	ModalContent,
	ModalCloseButton,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	useDisclosure,
} from '@chakra-ui/react'
import StoreContext from '../utils/StoreContext'

export default function Modal({ isOpen, onClose, title }) {
	const { nurseList, shiftList } = useContext(StoreContext)
	const [shiftInput, setShiftInput] = useState('')
	const [nurseInput, setNurseInput] = useState('')
	const [error, setError] = useState('')
	const [checkValidity, setCheckValidity] = useState(false)

	const handleShiftInputChange = (e) => setShiftInput(e.target.value)
	const handleNurseInputChange = (e) => setNurseInput(e.target.value)

	const isShiftError = shiftInput === ''
	const isNurseError = nurseInput === ''

	const handleSubmit = async (event) => {
		event.preventDefault()
		setCheckValidity(true)

		try {
			console.log('submitting')
		} catch (error) {
			setError('There was an error')
		}
	}

	const handleCloseModal = () => {
		setShiftInput('')
		setNurseInput('')
	}

	useEffect(() => {
		setCheckValidity(false)
	}, [onClose])

	const isDisabled = shiftInput === ''

	return (
		<ChakraModal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{title}</ModalHeader>
				<ModalCloseButton onClick={handleCloseModal} />
				<ModalBody p={6}>
					<form onSubmit={handleSubmit}>
						{error && <FormErrorMessage>{error}</FormErrorMessage>}
						<FormControl isInvalid={isShiftError && checkValidity}>
							<FormLabel>Shift</FormLabel>
							<Select
								onChange={handleShiftInputChange}
								placeholder='Select Shift'
							>
								{shiftList?.map((item) => {
									const { end, name, start } = item
									return (
										<option value={name}>
											{`${name}:   
                                            ${new Date(
												start
											).toLocaleTimeString()} - ${new Date(
												end
											).toLocaleTimeString()}`}
										</option>
									)
								})}
							</Select>
							{/* this error message should never appear since the button is disabled unless a shift is selected. 
                            still adding for best practice */}
							{isShiftError && (
								<FormErrorMessage>
									Please select a shift.
								</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={isNurseError && checkValidity}>
							<FormLabel mt={4}>Nurse</FormLabel>
							<Select
								onChange={handleNurseInputChange}
								placeholder='Select Nurse'
							>
								{nurseList.map((item) => {
									const {
										last_name,
										first_name,
										qualification,
									} = item
									return (
										<option value={first_name}>
											{`${first_name} ${last_name}, ${qualification}`}
										</option>
									)
								})}
							</Select>
							{isNurseError && (
								<FormErrorMessage>
									Please assign a nurse.
								</FormErrorMessage>
							)}
						</FormControl>
						<Button
							isDisabled={isDisabled}
							mt={8}
							w='100%'
							type='submit'
							variant={isDisabled ? 'disabled' : 'primary'}
						>
							Save Assignment
						</Button>
					</form>
				</ModalBody>
			</ModalContent>
		</ChakraModal>
	)
}
