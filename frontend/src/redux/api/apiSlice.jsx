import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL, USERS_URL } from '../constants'

export const apiSlice = createApi({
	reducerPath: USERS_URL,
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints: builder => ({
		login: builder.mutation({
			query: data => ({
				url: `${USERS_URL}/auth`,
				method: 'POST',
				// headers: { 'Content-type': 'application/json' },
				body: data,
			}),
		}),
	}),
})

export const {useLoginMutation} = apiSlice;
