import React, { useContext, useEffect, useState } from 'react'
import {
	Table,
	TableContainer,
	TableCaption,
	Td,
	Tbody,
	Thead,
	Tr,
} from '@chakra-ui/react'

import StoreContext from '../utils/StoreContext'

export default function ShiftTable() {
	const { nurseList, shiftList } = useContext(StoreContext)

	return (
		<TableContainer w={'100%'}>
			<Table variant={'striped'}>
				<TableCaption>Schedule your shift above</TableCaption>
				<Thead bg={'secondary.500'} color={'white'}>
					<Tr>
						<Td>Shift Name</Td>
						<Td>Start Time</Td>
						<Td>End Time</Td>
						<Td>Certification Required</Td>
						<Td>Assigned Nurse</Td>
					</Tr>
				</Thead>
				<Tbody>
					{shiftList.length > 0 &&
						shiftList?.map((shift) => {
							const {
								end,
								id,
								name,
								nurse_id,
								qual_required,
								start,
							} = shift

							let nurse = ''
							if (nurse_id) {
								nurse = nurseList.find((nurseData) => {
									if (nurse_id === nurseData.id) {
										return nurseData
									}
								})
							}

							return (
								<Tr key={id}>
									<Td>{name}</Td>
									<Td>{new Date(start).toLocaleString()}</Td>
									<Td>{new Date(end).toLocaleString()}</Td>
									<Td>{qual_required}</Td>
									<Td>
										{Object.keys(nurse).length > 0
											? `${nurse?.first_name} ${nurse?.last_name}, ${nurse?.qualification}`
											: ''}
									</Td>
								</Tr>
							)
						})}
				</Tbody>
			</Table>
		</TableContainer>
	)
}
