import React, { useContext, useEffect, useState } from 'react'
import {
	Button,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Modal as ChakraModal,
	ModalBody,
	ModalContent,
	ModalCloseButton,
	ModalHeader,
	ModalOverlay,
	Select,
	Text,
} from '@chakra-ui/react'
import StoreContext from '../utils/StoreContext'

export default function Modal({ isOpen, onClose, title }) {
	const {
		handleShiftUpdate,
		nurseList = [],
		shiftList = [],
	} = useContext(StoreContext)
	const [shiftInput, setShiftInput] = useState('')
	const [nurseInput, setNurseInput] = useState('')
	const [error, setError] = useState('')
	const [checkValidity, setCheckValidity] = useState(false)

	const handleShiftInputChange = (e) => setShiftInput(e.target.value)
	const handleNurseInputChange = (e) => {
		setNurseInput(e.target.value)
	}

	const isShiftError = shiftInput === ''
	const isNurseError = nurseInput === ''

	const handleSubmit = async (event) => {
		event.preventDefault()
		setCheckValidity(true)

		if (isShiftError || isNurseError) {
			setError('Please revisit your selections.')
			return
		}

		try {
			const response = await fetch(`/shifts/${shiftInput}`, {
				method: 'PUT',
				body: JSON.stringify({ nurseID: nurseInput }),
				headers: {
					'Content-Type': 'application/json',
				},
			}).then(function (response) {
				if (response.status === 200) {
					onClose()
					handleShiftUpdate(shiftInput, nurseInput)
				} else if (response.status === 500) {
					setError('Something went wrong, please try again.')
				}
			})
		} catch (error) {
			setError('There was an error')
		}
	}

	const handleCloseModal = () => {
		setShiftInput('')
		setNurseInput('')
		setCheckValidity(false)
		onClose()
	}

	const isDisabled = shiftInput === ''

	return (
		<ChakraModal isOpen={isOpen} onClose={handleCloseModal}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{title}</ModalHeader>
				<ModalCloseButton />
				<ModalBody p={6}>
					<form onSubmit={handleSubmit}>
						<FormControl isInvalid={isShiftError && checkValidity}>
							<FormLabel>Shift</FormLabel>
							<Select
								onChange={handleShiftInputChange}
								placeholder='Select Shift'
							>
								{shiftList?.map((item) => {
									const { end, id, name, start } = item
									return (
										<option
											key={`${id}-${name}`}
											value={id}
										>
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
										id,
										last_name,
										first_name,
										qualification,
									} = item
									return (
										<option
											key={`${id}-${first_name}-${last_name}`}
											value={id}
										>
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
						{error && <Text mt={3}>{error}</Text>}
					</form>
				</ModalBody>
			</ModalContent>
		</ChakraModal>
	)
}
