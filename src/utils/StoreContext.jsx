import React, { createContext, useEffect, useState } from 'react'

const StoreContext = createContext({
	nurseList: [],
	shiftList: [],
})

export function StoreContextProvider({ children, ...restOfProps }) {
	const [shiftList, setShiftList] = useState(restOfProps.shiftList)
	const [nurseList, setNurseList] = useState(restOfProps.nurseList)

	// Part 3 - update the internal state of the app to display the assigned nurse's name
	// also probably could have left this in the Modal component
	// but for the sake of pretending this is a larger app, having the data accessible
	// everywhere makes things easier
	const handleShiftUpdate = (shiftID, nurseID) => {
		const newShiftList = shiftList.map((item) => {
			if (item.id === +shiftID) {
				return {
					...item,
					nurse_id: +nurseID,
				}
			} else {
				return item
			}
		})

		setShiftList(newShiftList)
	}

	return (
		<StoreContext.Provider
			value={{ handleShiftUpdate, nurseList, shiftList }}
		>
			{children}
		</StoreContext.Provider>
	)
}

export default StoreContext
