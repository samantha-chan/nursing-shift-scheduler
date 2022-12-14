import React from 'react'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'

export default class Document extends NextDocument {
	render() {
		return (
			<Html lang='eng'>
				<Head>
					{/* <title>Nursing Shift Scheduler - connectRN</title> */}
					<meta
						name='description'
						content='Nursing Shift Scheduler - generated by create next app'
					/>
					<link rel='icon' href='/favicon.ico' />
				</Head>
				<body>
					<ColorModeScript />
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}


