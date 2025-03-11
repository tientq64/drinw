import { ReactNode } from 'react'
import { RouterProvider } from 'react-router'
import { router } from './router'
import { createTheme, Theme, ThemeProvider } from '@mui/material'

const darkTheme: Theme = createTheme({
	palette: {
		mode: 'dark'
	},
	typography: {
		fontFamily: 'IBM Plex Sans, Roboto, sans-serif'
	},
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundImage: 'none',
					boxShadow: 'none'
				}
			}
		},
		MuiDialog: {
			defaultProps: {
				classes: {
					paper: '!bg-zinc-800'
				}
			}
		}
	}
})

export function App(): ReactNode {
	return (
		<ThemeProvider theme={darkTheme}>
			<div className="h-full bg-zinc-900 text-zinc-50 scheme-dark">
				<RouterProvider router={router} />
			</div>
		</ThemeProvider>
	)
}
