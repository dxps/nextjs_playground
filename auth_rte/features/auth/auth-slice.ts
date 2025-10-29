import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/data/model/user'

export interface AuthState {
	isLoggedIn: boolean
	isLoading: boolean
	isError: boolean
	errorMessage: string | null
	user: User | null
}

const initialState: AuthState = {
	isLoggedIn: false,
	isLoading: true,
	isError: false,
	errorMessage: '',
	user: null,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
			state.isLoggedIn = action.payload
		},
		setIsLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload
		},
		setIsError: (state, action: PayloadAction<boolean>) => {
			state.isError = action.payload
		},
		setErrorMessage: (state, action: PayloadAction<string>) => {
			state.errorMessage = action.payload
		},
		setUser: (state, action: PayloadAction<User | null>) => {
			state.user = action.payload
		},
	},
})

// Action creators are generated for each case reducer function.
export const {
	setIsLoggedIn,
	setIsLoading,
	setIsError,
	setErrorMessage,
	setUser,
} = authSlice.actions

export const authReducer = authSlice.reducer

export const authSelector = (state: { auth: AuthState }) => state.auth
