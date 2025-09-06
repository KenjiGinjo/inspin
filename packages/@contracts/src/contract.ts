import type {
  IAdventurBase,
  ResAdminAuthState,
  ResUserBase,
  ResUserProfile,
  ResUserTodoList,
} from '@inspin/interfaces'
import type {
  vAuthChangePassword,
  vAuthLoginByPassword,
  vAuthRegister,
  vUserProfileUpdate,
} from '@inspin/validations'
import { initContract } from '@packages/ts-rest-react-query/ts-rest-core'

const c = initContract()
export const contract = {
  adventure: c.router({
    ':userTodoId': {
      pending: c.router({
        $post: {
          method: 'POST',
          path: 'adventure/:userTodoId/pending',
          query: c.type<undefined>(),
          body: c.type<undefined>(),
          responses: { 200: c.type<undefined>() },
        },
      }),
      fail: c.router({
        $post: {
          method: 'POST',
          path: 'adventure/:userTodoId/fail',
          query: c.type<undefined>(),
          body: c.type<undefined>(),
          responses: { 200: c.type<undefined>() },
        },
      }),
      finish: c.router({
        $post: {
          method: 'POST',
          path: 'adventure/:userTodoId/finish',
          query: c.type<undefined>(),
          body: c.type<undefined>(),
          responses: { 200: c.type<undefined>() },
        },
      }),
    },
    '$post': {
      method: 'POST',
      path: 'adventure',
      query: c.type<undefined>(),
      body: c.type<undefined>(),
      responses: { 200: c.type<{ data: IAdventurBase }>() },
    },
    '$get': {
      method: 'GET',
      path: 'adventure',
      query: c.type<undefined>(),
      responses: {
        200: c.type<{
          data: ResUserTodoList | null | 'fullfilled-in-last-7-days'
        }>(),
      },
    },
  }),
  authentication: {
    'delete-account': c.router({
      $delete: {
        method: 'DELETE',
        path: 'authentication/delete-account',
        query: c.type<undefined>(),
        body: c.type<undefined>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
    'change-password': c.router({
      $put: {
        method: 'PUT',
        path: 'authentication/change-password',
        query: c.type<undefined>(),
        body: c.type<vAuthChangePassword>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
    'logout': c.router({
      $put: {
        method: 'PUT',
        path: 'authentication/logout',
        query: c.type<undefined>(),
        body: c.type<undefined>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
    'register-by-username': c.router({
      $post: {
        method: 'POST',
        path: 'authentication/register-by-username',
        query: c.type<undefined>(),
        body: c.type<vAuthRegister>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
    'login-by-password': c.router({
      $post: {
        method: 'POST',
        path: 'authentication/login-by-password',
        query: c.type<undefined>(),
        body: c.type<vAuthLoginByPassword>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
  },
  user: {
    profile: c.router({
      $put: {
        method: 'PUT',
        path: 'user/profile',
        query: c.type<undefined>(),
        body: c.type<vUserProfileUpdate>(),
        responses: { 200: c.type<undefined>() },
      },
      $get: {
        method: 'GET',
        path: 'user/profile',
        query: c.type<undefined>(),
        responses: { 200: c.type<{ data: ResUserProfile }>() },
      },
    }),
    state: c.router({
      $get: {
        method: 'GET',
        path: 'user/state',
        query: c.type<undefined>(),
        responses: { 200: c.type<{ data: ResUserBase | null }>() },
      },
    }),
  },
  userTodo: {
    pageForFinished: c.router({
      $get: {
        method: 'GET',
        path: 'userTodo/pageForFinished',
        query: c.type<undefined>(),
        responses: { 200: c.type<{ data: ResUserTodoList[] }>() },
      },
    }),
    pageForFailed: c.router({
      $get: {
        method: 'GET',
        path: 'userTodo/pageForFailed',
        query: c.type<undefined>(),
        responses: { 200: c.type<{ data: ResUserTodoList[] }>() },
      },
    }),
  },
  admin: {
    auth: {
      state: c.router({
        $get: {
          method: 'GET',
          path: 'admin/auth/state',
          query: c.type<undefined>(),
          responses: { 200: c.type<{ data: ResAdminAuthState }>() },
        },
      }),
    },
    login: {
      password: c.router({
        $post: {
          method: 'POST',
          path: 'admin/login/password',
          query: c.type<undefined>(),
          body: c.type<vAuthLoginByPassword>(),
          responses: { 200: c.type<undefined>() },
        },
      }),
    },
  },
}
