import React from 'react'
import styled from 'styled-components'
import { CssBaseline } from '@material-ui/core'
import { createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles'
import { cyan, deepPurple, pink } from '@material-ui/core/colors'

const MasterLayoutContainer = styled.div`
	min-height: 100vh;
`
export const MasterLayout = ({ children }) => {
	const darkMode = false
	const palletType = darkMode ? 'dark' : 'light'
	const mainPrimaryColor = darkMode ? cyan[400] : '#1C69FF'
	const mainSecondaryColor = darkMode ? pink[400] : deepPurple.A400
	const themePalette = responsiveFontSizes(
		createMuiTheme({
			palette: {
				type: palletType,
				primary: {
					main: mainPrimaryColor,
				},
				secondary: {
					main: mainSecondaryColor,
				},
			},
			props: {
				MuiButtonBase: {
					// The default props to change
					disableRipple: true, // No more ripple, on the whole application 💣!
				},
			},
			typography: {
				// eslint-disable-next-line quotes
				fontFamily: "'Signika', sans-serif",
				fontSize: 14,
				fontWeightLight: 300,
				fontWeightRegular: 400,
				fontWeightMedium: 500,
			},
		}),
	)

	return (
		<ThemeProvider theme={themePalette}>
			<MasterLayoutContainer>
				<CssBaseline />
				{children}
			</MasterLayoutContainer>
		</ThemeProvider>
	)
}
