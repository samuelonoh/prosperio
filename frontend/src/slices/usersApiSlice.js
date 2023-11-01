import { apiSlice } from './apiSlice';
const USERS_URL = '/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
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
     updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/updateProfile`,
        method: 'PUT',
        body: data,
      }),
     }),
     profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/me`,
        method: 'GET',
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forgotPassword`,
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data, resetToken) => ({
        url: `${USERS_URL}/resetPassword/${resetToken}`,
        method: 'PUT',
        body: data,
      }),
    }),
    reportIssues: builder.mutation({
      query: (data) => ({
        url: `/api/contactUs`,
        method: 'POST',
        body: data,
      })
    })
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useProfileMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useReportIssuesMutation,
} = usersApiSlice;