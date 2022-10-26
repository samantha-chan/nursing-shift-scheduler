import React, { createContext, useEffect, useState } from 'react'

const StoreContext = createContext({
	nurseList: [],
	shiftList: [],
})

export function StoreContextProvider({ children, ...restOfProps }) {
	const [shiftList, setShiftList] = useState(restOfProps.shiftList)
	const [nurseList, setNurseList] = useState(restOfProps.nurseList)

	useEffect(() => {
		const getAssignedNurse = () => {
			shiftList?.map((shift) => {
				if (shift.nurse_id) {
					const nurse = nurseList.find((nurse) => {
						return nurse.id === shift.nurse_id
					})
					shift.nurse = nurse
				}
			})
			setShiftList(shiftList)
		}

		getAssignedNurse()
	})

	return (
		<StoreContext.Provider value={{ nurseList, shiftList }}>
			{children}
		</StoreContext.Provider>
	)
}

export default StoreContext
