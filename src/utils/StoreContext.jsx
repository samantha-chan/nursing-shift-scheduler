import React, { createContext, useEffect, useState } from 'react'

const StoreContext = createContext({
	nurseList: [],
	shiftList: [],
})

export function StoreContextProvider({ children, ...restOfProps }) {
	const [shiftList, setShiftList] = useState(restOfProps.shiftList)
	const [nurseList, setNurseList] = useState(restOfProps.nurseList)

	return (
		<StoreContext.Provider value={{ nurseList, shiftList }}>
			{children}
		</StoreContext.Provider>
	)
}

export default StoreContext
