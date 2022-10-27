import React, { useContext, useEffect, useState } from 'react'
import {
	Button,
	Flex,
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
import { InfoOutlineIcon, WarningTwoIcon } from '@chakra-ui/icons'
import StoreContext from '../utils/StoreContext'

const ErrorMessage = ({ icon, message }) => {
	const Icon = icon
	return (
		<Flex align='center' mt={4}>
			<Icon h={4} w={4} />
			<Text pl={2}>{message}</Text>
		</Flex>
	)
}

export default function Modal({ isOpen, onClose, title }) {
	const {
		handleShiftUpdate,
		nurseList = [],
		shiftList = [],
	} = useContext(StoreContext)
	const [shiftInput, setShiftInput] = useState('')
	const [nurseInput, setNurseInput] = useState('')
	const [error, setError] = useState('')
	const [qualificationError, setQualificationError] = useState('')
	const [invalidateForm, setInvalidateForm] = useState(false)
	const [invalidQual, setInvalidQual] = useState(false)
	const [invalidTime, setInvalidTime] = useState(false)
	const [checkValidity, setCheckValidity] = useState(false)

	useEffect(() => {
		const getShiftInputTimes = shiftList.filter((shift) => {
			return shift.id === shiftInput
		})[0]

		if (nurseInput) {
			const getSelectedNurse = nurseList.filter((nurse) => {
				return nurse.id === nurseInput
			})[0]

			const getSelectedShift = shiftList.filter((shift) => {
				return shift.id === shiftInput
			})[0]

			//check for shift vs nurse qualifications
			const shiftQualification = getSelectedShift.qual_required
			const nurseQualification = getSelectedNurse.qualification

			const handleNotQualified = () => {
				setInvalidQual(true)
				setQualificationError(
					'Nurse does not have the required certification'
				)
			}

			const handleQualified = () => {
				setInvalidQual(false)
				setQualificationError('')
			}

			if (shiftQualification === 'RN') {
				nurseQualification === 'RN'
					? handleQualified()
					: handleNotQualified()
			} else if (shiftQualification === 'LPN') {
				nurseQualification === 'LPN' || nurseQualification === 'RN'
					? handleQualified()
					: handleNotQualified()
			} else if (shiftQualification === 'CNA') {
				nurseQualification === 'CNA' ||
				nurseQualification === 'LPN' ||
				nurseQualification === 'RN'
					? handleQualified()
					: handleNotQualified()
			}

			// check for nurse shift time overlaps
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
				setInvalidTime(true)
				setError(
					'Nurse is already assigned to a shift during this time'
				)
			} else {
				setInvalidTime(false)
				setError('')
			}
		}
	}, [shiftInput, nurseInput])

	const handleShiftInputChange = (e) => setShiftInput(+e.target.value)
	const handleNurseInputChange = (e) => setNurseInput(+e.target.value)

	const isShiftError = shiftInput === ''
	const isNurseError = nurseInput === ''

	const invalidForm = invalidQual || invalidTime

	const handleCloseModal = () => {
		// reset all state values
		setShiftInput('')
		setNurseInput('')
		setError('')
		setQualificationError('')
		setInvalidQual(false)
		setInvalidTime(false)
		setInvalidateForm(false)
		setCheckValidity(false)
		onClose()
	}

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
					handleCloseModal()
					handleShiftUpdate(shiftInput, nurseInput)
				} else if (response.status === 500) {
					setError('Something went wrong, please try again.')
				}
			})
		} catch (error) {
			setError('There was an error')
		}
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
									const {
										end,
										id,
										name,
										start,
										qual_required,
									} = item
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
											).toLocaleTimeString()} (${qual_required})`}
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
						{qualificationError && (
							<ErrorMessage
								icon={InfoOutlineIcon}
								message={qualificationError}
							/>
						)}
						{error && (
							<ErrorMessage
								icon={WarningTwoIcon}
								message={error}
							/>
						)}

						<Button
							isDisabled={invalidForm || isDisabled}
							mt={8}
							w='100%'
							type='submit'
							variant={'primary'}
						>
							Save Assignment
						</Button>
					</form>
				</ModalBody>
			</ModalContent>
		</ChakraModal>
	)
}
