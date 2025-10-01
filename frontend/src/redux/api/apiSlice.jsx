// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createApi } from '@reduxjs/toolkit/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { BASE_URL, USERS_URL, GENRE_URL, MOVIE_URL, UPLOAD_URL } from '../constants'

export const apiSlice = createApi({
	reducerPath:'api',
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
			query: () => ({
				url: `${USERS_URL}/logout`,
				method: 'POST',
			}),
		}),

		profile: builder.mutation({
			query: data => ({
				url: `${USERS_URL}/profile`,
				method: 'PUT',
				body: data,
			}),
		}),

		createGenre: builder.mutation({
			query: newGenre => ({
				url: `${GENRE_URL}`,
				method: 'POST',
				body: newGenre,
			}),
		}),
		updateGenre: builder.mutation({
			query: ({ id, updatedGenre }) => ({
				url: `${GENRE_URL}/${id}`,
				method: 'PUT',
				body: updatedGenre,
			}),
		}),
		deleteGenre: builder.mutation({
			query: id => ({
				url: `${GENRE_URL}/${id}`,
				method: 'DELETE',
			}),
		}),
		fetchGenres: builder.query({
			query: () => ({
				url: `${GENRE_URL}/genres`,
			}),
		}),

		getAllMovies: builder.query({
			query: () => `${MOVIE_URL}/all-movies`,
		}),

		createMovie: builder.mutation({
			query: newMovie => ({
				url: `${MOVIE_URL}/create-movie`,
				method: 'POST',
				body: newMovie,
			}),
		}),
		updateMovie: builder.mutation({
			query: ({ id, updatedMovie }) => ({
				url: `${MOVIE_URL}/update-movie/${id}`,
				method: 'PUT',
				body: updatedMovie,
			}),
		}),
		addMovieReview: builder.mutation({
			query: ({ id, rating, comment }) => ({
				url: `${MOVIE_URL}/${id}/reviews`,
				method: 'POST',
				body: { rating, id, comment },
			}),
		}),
		deleteComment: builder.mutation({
			query: ({ movieId, reviewId }) => ({
				url: `${MOVIE_URL}/delete-comment`,
				method: 'DELETE',
				body: { movieId, reviewId },
			}),
		}),
		deleteMovie: builder.mutation({
			query: id => ({
				url: `${MOVIE_URL}/delete-movie/${id}`,
				method: 'DELETE',
			}),
		}),
		getSpecificMovie: builder.query({
			query: id => `${MOVIE_URL}/specific-movie/${id}`,
		}),

		uploadImage: builder.mutation({
			query: formData => ({
				url: `${UPLOAD_URL}`,
				method: 'POST',
				body: formData,
			}),
		}),
		getNewMovies: builder.query({
			query: () => `${MOVIE_URL}/new-movies`,
		}),
		getTopMovies: builder.query({
			query: () => `${MOVIE_URL}/top-movies`,
		}),
		getRandomMovies: builder.query({
			query: () => `${MOVIE_URL}/random-movies`,
		}),
	}),
})

export const {
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
	useProfileMutation,
	useCreateGenreMutation,
	useUpdateGenreMutation,
	useDeleteGenreMutation,
	useFetchGenresQuery,
	useGetAllMoviesQuery,
	useUpdateMovieMutation,
	useAddMovieReviewMutation,
	useDeleteCommentMutation,
	useDeleteMovieMutation,
	useGetSpecificMovieQuery,
	useUploadImageMutation,
	useGetNewMoviesQuery,
	useGetTopMoviesQuery,
	useGetRandomMoviesQuery,
	useCreateMovieMutation,
} = apiSlice
