import type {
  IAdventurBase,
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
export const contract = c.router({
  adventure: c.router({
    $post: {
      method: 'POST',
      path: 'adventure',
      body: null,
      responses: { 200: c.type<{ data: IAdventurBase }>() },
    },
    $get: {
      method: 'GET',
      path: 'adventure',
      responses: {
        200: c.type<{
          data: ResUserTodoList | null | 'fullfilled-in-last-7-days'
        }>(),
      },
    },
  }),
  authentication: c.router({
    'delete-account': c.router({
      $delete: {
        method: 'DELETE',
        path: 'authentication/delete-account',
        body: null,
        responses: { 200: c.type<undefined>() },
      },
    }),
    'change-password': c.router({
      $put: {
        method: 'PUT',
        path: 'authentication/change-password',
        body: c.type<vAuthChangePassword>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
    'logout': c.router({
      $put: {
        method: 'PUT',
        path: 'authentication/logout',
        body: null,
        responses: { 200: c.type<undefined>() },
      },
    }),
    'register-by-username': c.router({
      $post: {
        method: 'POST',
        path: 'authentication/register-by-username',
        body: c.type<vAuthRegister>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
    'login-by-password': c.router({
      $post: {
        method: 'POST',
        path: 'authentication/login-by-password',
        body: c.type<vAuthLoginByPassword>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
  }),
  user: c.router({
    profile: c.router({
      $put: {
        method: 'PUT',
        path: 'user/profile',
        body: c.type<vUserProfileUpdate>(),
        responses: { 200: c.type<undefined>() },
      },
      $get: {
        method: 'GET',
        path: 'user/profile',
        responses: { 200: c.type<{ data: ResUserProfile }>() },
      },
    }),
    state: c.router({
      $get: {
        method: 'GET',
        path: 'user/state',
        responses: { 200: c.type<{ data: ResUserBase | null }>() },
      },
    }),
  }),
  userTodo: c.router({
    ':id': c.router({
      pending: c.router({
        $post: {
          method: 'POST',
          path: 'userTodo/:id/pending',
          body: null,
          responses: { 200: c.type<undefined>() },
        },
      }),
      fail: c.router({
        $post: {
          method: 'POST',
          path: 'userTodo/:id/fail',
          body: null,
          responses: { 200: c.type<undefined>() },
        },
      }),
      finish: c.router({
        $post: {
          method: 'POST',
          path: 'userTodo/:id/finish',
          body: null,
          responses: { 200: c.type<undefined>() },
        },
      }),
    }),
    pageForFinished: c.router({
      $get: {
        method: 'GET',
        path: 'userTodo/pageForFinished',
        responses: { 200: c.type<{ data: ResUserTodoList[] }>() },
      },
    }),
    pageForFailed: c.router({
      $get: {
        method: 'GET',
        path: 'userTodo/pageForFailed',
        responses: { 200: c.type<{ data: ResUserTodoList[] }>() },
      },
    }),
  }),
}, { strictStatusCodes: false })
