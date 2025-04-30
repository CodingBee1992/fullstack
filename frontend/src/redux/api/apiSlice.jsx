// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createApi } from '@reduxjs/toolkit/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { BASE_URL, USERS_URL } from '../constants'

export const apiSlice = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints: builder => ({
		login: builder.mutation({
			query: data => ({
				url: `${USERS_URL}/auth`,
				method: 'POST',

				body: data,
			}),
		}),

		register: builder.mutation({
			query: data => ({
				url: `${USERS_URL}`,
				method: 'POST',

				body: data,
			}),
		}),

		logout: builder.mutation({
			query:() =>({
				url:`${USERS_URL}/logout`,
				method:'POST'
			})
		})
	}),
})

export const { useLoginMutation, useRegisterMutation,useLogoutMutation } = apiSlice
