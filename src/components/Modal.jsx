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
	const [invalidateForm, setInvalidateForm] = useState(false)
	const [checkValidity, setCheckValidity] = useState(false)

	useEffect(() => {
		// get all of the shifts that are not assigned to a nurse
		const getShiftInputTimes = shiftList.filter((shift) => {
			return shift.id === shiftInput
		})[0]

		if (nurseInput) {
			const getNurseShiftTimes = shiftList
				.filter((shift) => {
					return shift.nurse_id === nurseInput
				})
				.map((shift) => {
					return { start: shift.start, end: shift.end }
				})

			const shiftInputStartTime = new Date(getShiftInputTimes?.start)
			const shiftInputEndTime = new Date(getShiftInputTimes?.end)

			const isBusy = getNurseShiftTimes.filter((shift) => {
				const nurseShiftStartTime = new Date(shift.start)
				const nurseShiftEndTime = new Date(shift.end)

				return (
					Math.min(shiftInputStartTime, shiftInputEndTime) <=
						Math.max(nurseShiftStartTime, nurseShiftEndTime) &&
					Math.max(shiftInputStartTime, shiftInputEndTime) >=
						Math.min(nurseShiftStartTime, nurseShiftEndTime)
				)
			})

			if (isBusy.length > 0) {
				setInvalidateForm(true)
				setError(
					'Nurse is already assigned to a shift during this time'
				)
			} else {
				setInvalidateForm(false)
				setError('')
			}
		}
	}, [shiftInput, nurseInput])

	const handleShiftInputChange = (e) => setShiftInput(+e.target.value)
	const handleNurseInputChange = (e) => setNurseInput(+e.target.value)

	const isShiftError = shiftInput === ''
	const isNurseError = nurseInput === ''

	const handleSubmit = async (event) => {
		event.preventDefault()
		if (invalidateForm) {
			return
		}
		setCheckValidity(true)

		if (isShiftError || isNurseError) {
			setError('Please revisit your selections.')
			return
		}

		try {
			await fetch(`/shifts/${shiftInput}`, {
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
		// reset all state values
		setShiftInput('')
		setNurseInput('')
		setInvalidateForm(false)
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
						<FormControl
							isInvalid={
								invalidateForm ||
								(isShiftError && checkValidity)
							}
						>
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
						<FormControl
							isInvalid={
								invalidateForm ||
								(isNurseError && checkValidity)
							}
						>
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
							isDisabled={invalidateForm || isDisabled}
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
