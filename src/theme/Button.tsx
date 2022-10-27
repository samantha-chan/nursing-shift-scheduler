import type { ComponentStyleConfig } from '@chakra-ui/react'

export const Button: ComponentStyleConfig = {
	baseStyle: {
		bg: 'primary.500',
		color: 'white',
	},
	variants: {
		primary: {
			bg: 'primary.500',
			color: 'white',
			_hover: { bg: 'primary.300', _disabled: { bg: 'primary.500' }},
			
		},
		disabled: {
			_hover: { bg: 'primary.500' }
		}
	},
	defaultProps: {
		variant: 'primary'
	}
}
