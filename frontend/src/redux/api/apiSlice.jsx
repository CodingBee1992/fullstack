// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createApi } from '@reduxjs/toolkit/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { BASE_URL, USERS_URL, GENRE_URL } from '../constants'

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
		}),

		profile:builder.mutation({
			query:(data)=>({
				url:`${USERS_URL}/profile`,
				method:"PUT",
				body:data
			})
		}),

		createGenre:builder.mutation({
			query:(newGenre) =>({
				url:`${GENRE_URL}`,
				method:"POST",
				body:newGenre
			})
		}),
		updateGenre:builder.mutation({
			
			query:({id,updatedGenre}) =>({
				url:`${GENRE_URL}/${id}`,
				method:"PUT",
				body:updatedGenre
			})
		}),
		deleteGenre:builder.mutation({
			query:(id) =>({
				url:`${GENRE_URL}/${id}`,
				method:"DELETE",
				
			})
		}),
		fetchGenres:builder.query({
			query:() =>({
				url:`${GENRE_URL}/genres`,
				
				
			})
		}),
		
	}),
})

export const { useLoginMutation, useRegisterMutation,useLogoutMutation,useProfileMutation, useCreateGenreMutation,useUpdateGenreMutation,useDeleteGenreMutation,useFetchGenresQuery } = apiSlice
