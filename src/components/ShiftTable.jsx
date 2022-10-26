import React, { useContext } from 'react'
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
	const { shiftList } = useContext(StoreContext)
	return (
		<TableContainer w={'100%'}>
			<Table variant={'striped'}>
				<TableCaption>Schedule your shift</TableCaption>
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
					{shiftList?.map((item) => {
						const { end, id, name, nurse, qual_required, start } =
							item
						return (
							<Tr key={id}>
								<Td>{name}</Td>
								<Td>{new Date(start).toLocaleString()}</Td>
								<Td>{new Date(end).toLocaleString()}</Td>
								<Td>{qual_required}</Td>
								<Td>
									{nurse
										? `${nurse.first_name} ${nurse.last_name}`
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
