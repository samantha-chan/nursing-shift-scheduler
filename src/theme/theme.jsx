import { extendTheme } from '@chakra-ui/react'
import { Button } from './Button'

const fonts = { mono: `'Menlo', monospace` }

const theme = extendTheme({
	components: {
		Button,
	},
	colors: {
		primary: {
			300: '#806eff',
			500: '#644DFF',
		},
		secondary: {
			300: '#172D49',
			500: '#001936',
		},
		tertiary: {
			500: '#079B62',
		},
		accent: {
			500: '#DB3B0A',
		},
	},
	fonts,
})

console.log(theme)

export default theme
