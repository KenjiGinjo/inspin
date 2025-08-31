import type {
  AdminCharacterSaleOrderList,
  AdminCrowdfundingSupportList,
  ICharacterBase,
  IUserAddress,
  IUserState,
  ResAdminAuthState,
  ResCharacterPhasesForList,
  ResCharacterPhasesForShow,
  ResCharacterSaleOrderList,
  ResCharacterSaleOrderShow,
  ResCrowdfundingList,
  ResCrowdfundingShow,
  ResCrowdfundingSpecList,
  ResCrowdfundingSupportList,
  ResCrowdfundingSupportShow,
  ResExploreList,
  ResFigurineList,
  ResFigurineShow,
  ResHomeBanner,
  ResRaffleEntryRecord,
  ResRaffleShow,
  ResSaleSpecList,
  ResUserListForAdmin,
  ResUserProfile,
  ResVoteShow,
} from '@inspin/interfaces'
import type {
  vAdminCharacterList,
  vAuthChangePassword,
  vAuthLoginByPassword,
  vAuthRegisterByEmail,
  vCharacterCreate,
  vCharacterCrowdfundingSupport,
  vCharacterMyCampaigns,
  vCharacterSaleOrderQuery,
  vCharacterSaleOrderUpdate,
  vCharacterUpdate,
  vCrowdfundingListQuery,
  vCrowdfundingSpecCreate,
  vCrowdfundingSpecUpdate,
  vCrowdfundingSupportQuery,
  vCrowdfundingUpdate,
  vExploreListQuery,
  vFigurineItems,
  vFigurineListQuery,
  vPayConfirm,
  vRaffleEntryRecordUpdate,
  vSaleSpecCreate,
  vSaleSpecUpdate,
  vSaleUpdate,
  vSendEmailVerificationCode,
  vUploadUserAvatar,
  vUserAddressCreate,
  vUserAddressUpdate,
  vUserListAdminQuery,
  vUserProfileUpdate,
  vVoteListQuery,
  vVoteUpdate,
} from '@inspin/validations'

import { initContract } from '@packages/ts-rest-react-query/ts-rest-core'

const c = initContract()
export const contract = {
  'article': {
    faq: c.router({
      $get: {
        method: 'GET',
        path: 'article/faq',
        query: c.type<undefined>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
  },
  'authentication': {
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
    'register-by-google': c.router({
      $post: {
        method: 'POST',
        path: 'authentication/register-by-google',
        query: c.type<undefined>(),
        body: c.type<undefined>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
    'register-by-phone': c.router({
      $post: {
        method: 'POST',
        path: 'authentication/register-by-phone',
        query: c.type<undefined>(),
        body: c.type<undefined>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
    'register-by-email': c.router({
      $post: {
        method: 'POST',
        path: 'authentication/register-by-email',
        query: c.type<undefined>(),
        body: c.type<vAuthRegisterByEmail>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
    'login-by-google': c.router({
      $post: {
        method: 'POST',
        path: 'authentication/login-by-google',
        query: c.type<undefined>(),
        body: c.type<undefined>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
    'login-by-phone': c.router({
      $post: {
        method: 'POST',
        path: 'authentication/login-by-phone',
        query: c.type<undefined>(),
        body: c.type<undefined>(),
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
    'send-phone-verification-code': c.router({
      $post: {
        method: 'POST',
        path: 'authentication/send-phone-verification-code',
        query: c.type<undefined>(),
        body: c.type<undefined>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
    'send-email-verification-code': c.router({
      $post: {
        method: 'POST',
        path: 'authentication/send-email-verification-code',
        query: c.type<undefined>(),
        body: c.type<vSendEmailVerificationCode>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
    'check-exist': c.router({
      $get: {
        method: 'GET',
        path: 'authentication/check-exist',
        query: c.type<undefined>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
  },
  'character-sale-order': {
    ':characterSaleOrderId': c.router({
      $put: {
        method: 'PUT',
        path: 'character-sale-order/:characterSaleOrderId',
        query: c.type<undefined>(),
        body: c.type<vCharacterSaleOrderUpdate>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
    'show': {
      ':characterSaleOrderId': c.router({
        $get: {
          method: 'GET',
          path: 'character-sale-order/show/:characterSaleOrderId',
          query: c.type<undefined>(),
          responses: { 200: c.type<{ data: ResCharacterSaleOrderShow }>() },
        },
      }),
    },
  },
  'character': c.router({
    ':characterId': c.router({
      $delete: {
        method: 'DELETE',
        path: 'character/:characterId',
        query: c.type<undefined>(),
        body: c.type<undefined>(),
        responses: { 200: c.type<undefined>() },
      },
      $patch: {
        method: 'PATCH',
        path: 'character/:characterId',
        query: c.type<undefined>(),
        body: c.type<vCharacterUpdate>(),
        responses: { 200: c.type<undefined>() },
      },
      uncollect: c.router({
        $put: {
          method: 'PUT',
          path: 'character/:characterId/uncollect',
          query: c.type<undefined>(),
          body: c.type<undefined>(),
          responses: { 200: c.type<undefined>() },
        },
      }),
      collect: c.router({
        $put: {
          method: 'PUT',
          path: 'character/:characterId/collect',
          query: c.type<undefined>(),
          body: c.type<undefined>(),
          responses: { 200: c.type<undefined>() },
        },
      }),
      $get: {
        method: 'GET',
        path: 'character/:characterId',
        query: c.type<undefined>(),
        responses: { 200: c.type<{ data: ICharacterBase }>() },
      },
    }),
    '$post': {
      method: 'POST',
      path: 'character',
      query: c.type<undefined>(),
      body: c.type<vCharacterCreate>(),
      responses: { 200: c.type<{ data: { id: string } }>() },
    },
    'pageForShoppingCart': c.router({
      $get: {
        method: 'GET',
        path: 'character/pageForShoppingCart',
        query: c.type<undefined>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
    'pageForUserCollection': c.router({
      $get: {
        method: 'GET',
        path: 'character/pageForUserCollection',
        query: c.type<undefined>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
    'pageForMine': c.router({
      $get: {
        method: 'GET',
        path: 'character/pageForMine',
        query: c.type<vCharacterMyCampaigns>(),
        responses: { 200: c.type<{ data: ResCharacterPhasesForList[] }>() },
      },
    }),
  }),
  'contributor': {
    ':projectId': c.router({
      $get: {
        method: 'GET',
        path: 'contributor/:projectId',
        query: c.type<undefined>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
  },
  'crowdfunding-support': c.router({
    show: {
      ':supportId': c.router({
        $get: {
          method: 'GET',
          path: 'crowdfunding-support/show/:supportId',
          query: c.type<undefined>(),
          responses: { 200: c.type<{ data: ResCrowdfundingSupportShow }>() },
        },
      }),
    },
    $post: {
      method: 'POST',
      path: 'crowdfunding-support',
      query: c.type<undefined>(),
      body: c.type<vCharacterCrowdfundingSupport>(),
      responses: { 200: c.type<undefined>() },
    },
  }),
  'crowdfunding': {
    'show': {
      ':characterId': c.router({
        $get: {
          method: 'GET',
          path: 'crowdfunding/show/:characterId',
          query: c.type<undefined>(),
          responses: { 200: c.type<{ data: ResCrowdfundingShow }>() },
        },
      }),
    },
    'page-list': c.router({
      $get: {
        method: 'GET',
        path: 'crowdfunding/page-list',
        query: c.type<vCrowdfundingListQuery>(),
        responses: { 200: c.type<{ data: ResCrowdfundingList[] }>() },
      },
    }),
  },
  'explore': {
    'page-list': c.router({
      $get: {
        method: 'GET',
        path: 'explore/page-list',
        query: c.type<vExploreListQuery>(),
        responses: { 200: c.type<{ data: ResExploreList[] }>() },
      },
    }),
  },
  'figurine': {
    'buy': c.router({
      $post: {
        method: 'POST',
        path: 'figurine/buy',
        query: c.type<undefined>(),
        body: c.type<vFigurineItems>(),
        responses: {
          200: c.type<{ data: { characterSaleOrderId: string } }>(),
        },
      },
    }),
    'show': {
      ':characterId': c.router({
        $get: {
          method: 'GET',
          path: 'figurine/show/:characterId',
          query: c.type<undefined>(),
          responses: { 200: c.type<{ data: ResFigurineShow }>() },
        },
      }),
    },
    'page-list': c.router({
      $get: {
        method: 'GET',
        path: 'figurine/page-list',
        query: c.type<vFigurineListQuery>(),
        responses: { 200: c.type<{ data: ResFigurineList[] }>() },
      },
    }),
  },
  'message': {
    pageForMine: c.router({
      $get: {
        method: 'GET',
        path: 'message/pageForMine',
        query: c.type<undefined>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
  },
  'order': {
    crowdfunding: {
      list: c.router({
        $get: {
          method: 'GET',
          path: 'order/crowdfunding/list',
          query: c.type<vCrowdfundingSupportQuery>(),
          responses: { 200: c.type<{ data: ResCrowdfundingSupportList[] }>() },
        },
      }),
    },
    figurine: {
      list: c.router({
        $get: {
          method: 'GET',
          path: 'order/figurine/list',
          query: c.type<vCharacterSaleOrderQuery>(),
          responses: { 200: c.type<{ data: ResCharacterSaleOrderList[] }>() },
        },
      }),
    },
  },
  'pay': {
    paypal: {
      webhook: c.router({
        $post: {
          method: 'POST',
          path: 'pay/paypal/webhook',
          query: c.type<undefined>(),
          body: c.type<undefined>(),
          responses: { 200: c.type<undefined>() },
        },
      }),
    },
    stripe: {
      webhook: c.router({
        $post: {
          method: 'POST',
          path: 'pay/stripe/webhook',
          query: c.type<undefined>(),
          body: c.type<undefined>(),
          responses: { 200: c.type<undefined>() },
        },
      }),
    },
    confirm: c.router({
      $post: {
        method: 'POST',
        path: 'pay/confirm',
        query: c.type<undefined>(),
        body: c.type<vPayConfirm>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
    methods: c.router({
      $get: {
        method: 'GET',
        path: 'pay/methods',
        query: c.type<undefined>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
  },
  'raffle-entry-record': {
    ':raffleEntryRecordId': c.router({
      $put: {
        method: 'PUT',
        path: 'raffle-entry-record/:raffleEntryRecordId',
        query: c.type<undefined>(),
        body: c.type<vRaffleEntryRecordUpdate>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
    'show': {
      ':raffleEntryRecordId': c.router({
        $get: {
          method: 'GET',
          path: 'raffle-entry-record/show/:raffleEntryRecordId',
          query: c.type<undefined>(),
          responses: { 200: c.type<{ data: ResRaffleEntryRecord }>() },
        },
      }),
    },
  },
  'raffle': {
    'consume': {
      ':characterSaleSpecId': c.router({
        $post: {
          method: 'POST',
          path: 'raffle/consume/:characterSaleSpecId',
          query: c.type<undefined>(),
          body: c.type<undefined>(),
          responses: {
            200: c.type<{ data: { raffleEntryRecordId: string } }>(),
          },
        },
      }),
    },
    'pageForMine': c.router({
      $get: {
        method: 'GET',
        path: 'raffle/pageForMine',
        query: c.type<undefined>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
    'show': {
      ':characterSaleSpecId': c.router({
        $get: {
          method: 'GET',
          path: 'raffle/show/:characterSaleSpecId',
          query: c.type<undefined>(),
          responses: { 200: c.type<{ data: ResRaffleShow }>() },
        },
      }),
    },
    'entry-record': {
      ':raffleEntryRecordId': c.router({
        $get: {
          method: 'GET',
          path: 'raffle/entry-record/:raffleEntryRecordId',
          query: c.type<undefined>(),
          responses: { 200: c.type<undefined>() },
        },
      }),
    },
  },
  'system': {
    'figurine-banner': c.router({
      $get: {
        method: 'GET',
        path: 'system/figurine-banner',
        query: c.type<undefined>(),
        responses: { 200: c.type<{ data: ResHomeBanner[] }>() },
      },
    }),
    'home-banner': c.router({
      $get: {
        method: 'GET',
        path: 'system/home-banner',
        query: c.type<undefined>(),
        responses: { 200: c.type<{ data: ResHomeBanner[] }>() },
      },
    }),
  },
  'upload': {
    user: {
      avatar: c.router({
        $post: {
          method: 'POST',
          path: 'upload/user/avatar',
          query: c.type<undefined>(),
          body: c.type<vUploadUserAvatar>(),
          responses: { 200: c.type<{ data: string }>() },
        },
      }),
    },
  },
  'user-address': c.router({
    ':userAddressId': c.router({
      $delete: {
        method: 'DELETE',
        path: 'user-address/:userAddressId',
        query: c.type<undefined>(),
        body: c.type<undefined>(),
        responses: { 200: c.type<undefined>() },
      },
      $put: {
        method: 'PUT',
        path: 'user-address/:userAddressId',
        query: c.type<undefined>(),
        body: c.type<vUserAddressUpdate>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
    'setDefault': {
      ':userAddressId': c.router({
        $post: {
          method: 'POST',
          path: 'user-address/setDefault/:userAddressId',
          query: c.type<undefined>(),
          body: c.type<undefined>(),
          responses: { 200: c.type<undefined>() },
        },
      }),
    },
    '$post': {
      method: 'POST',
      path: 'user-address',
      query: c.type<undefined>(),
      body: c.type<vUserAddressCreate>(),
      responses: { 200: c.type<{ data: { userAddressId: string } }>() },
    },
    'show': {
      ':userAddressId': c.router({
        $get: {
          method: 'GET',
          path: 'user-address/show/:userAddressId',
          query: c.type<undefined>(),
          responses: { 200: c.type<{ data?: IUserAddress }>() },
        },
      }),
    },
    'default': c.router({
      $get: {
        method: 'GET',
        path: 'user-address/default',
        query: c.type<undefined>(),
        responses: { 200: c.type<{ data: IUserAddress | null }>() },
      },
    }),
    'listForMine': c.router({
      $get: {
        method: 'GET',
        path: 'user-address/listForMine',
        query: c.type<undefined>(),
        responses: { 200: c.type<{ data: IUserAddress[] }>() },
      },
    }),
  }),
  'user': {
    'profile': c.router({
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
    'check-login': c.router({
      $get: {
        method: 'GET',
        path: 'user/check-login',
        query: c.type<undefined>(),
        responses: { 200: c.type<{ data: boolean }>() },
      },
    }),
    'state': c.router({
      $get: {
        method: 'GET',
        path: 'user/state',
        query: c.type<undefined>(),
        responses: { 200: c.type<{ data: IUserState | null }>() },
      },
    }),
  },
  'vote': {
    ':characterId': c.router({
      $post: {
        method: 'POST',
        path: 'vote/:characterId',
        query: c.type<undefined>(),
        body: c.type<undefined>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
    'page-list': c.router({
      $get: {
        method: 'GET',
        path: 'vote/page-list',
        query: c.type<vVoteListQuery>(),
        responses: { 200: c.type<{ data: ResVoteShow[] }>() },
      },
    }),
    'show': {
      ':characterId': c.router({
        $get: {
          method: 'GET',
          path: 'vote/show/:characterId',
          query: c.type<undefined>(),
          responses: { 200: c.type<{ data: ResVoteShow }>() },
        },
      }),
    },
  },
  'voting-member': {
    ':id': c.router({
      $put: {
        method: 'PUT',
        path: 'voting-member/:id',
        query: c.type<undefined>(),
        body: c.type<undefined>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
  },
  'admin': {
    'auth': {
      state: c.router({
        $get: {
          method: 'GET',
          path: 'admin/auth/state',
          query: c.type<undefined>(),
          responses: { 200: c.type<{ data: ResAdminAuthState }>() },
        },
      }),
    },
    'character': {
      ':characterId': c.router({
        $delete: {
          method: 'DELETE',
          path: 'admin/character/:characterId',
          query: c.type<undefined>(),
          body: c.type<undefined>(),
          responses: { 200: c.type<undefined>() },
        },
        $put: {
          method: 'PUT',
          path: 'admin/character/:characterId',
          query: c.type<undefined>(),
          body: c.type<vCharacterCreate>(),
          responses: { 200: c.type<undefined>() },
        },
      }),
      'start-pre-sale': {
        ':characterId': c.router({
          $get: {
            method: 'GET',
            path: 'admin/character/start-pre-sale/:characterId',
            query: c.type<undefined>(),
            responses: { 200: c.type<undefined>() },
          },
        }),
      },
      'finish-crowdfunding-success': {
        ':characterId': c.router({
          $get: {
            method: 'GET',
            path: 'admin/character/finish-crowdfunding-success/:characterId',
            query: c.type<undefined>(),
            responses: { 200: c.type<undefined>() },
          },
        }),
      },
      'start-crowdfunding': {
        ':characterId': c.router({
          $get: {
            method: 'GET',
            path: 'admin/character/start-crowdfunding/:characterId',
            query: c.type<undefined>(),
            responses: { 200: c.type<undefined>() },
          },
        }),
      },
      'reject': {
        ':characterId': c.router({
          $get: {
            method: 'GET',
            path: 'admin/character/reject/:characterId',
            query: c.type<undefined>(),
            responses: { 200: c.type<undefined>() },
          },
        }),
      },
      'approve': {
        ':characterId': c.router({
          $get: {
            method: 'GET',
            path: 'admin/character/approve/:characterId',
            query: c.type<undefined>(),
            responses: { 200: c.type<undefined>() },
          },
        }),
      },
      'show': {
        ':characterId': c.router({
          $get: {
            method: 'GET',
            path: 'admin/character/show/:characterId',
            query: c.type<undefined>(),
            responses: { 200: c.type<{ data: ResCharacterPhasesForShow }>() },
          },
        }),
      },
      'list': c.router({
        $get: {
          method: 'GET',
          path: 'admin/character/list',
          query: c.type<vAdminCharacterList>(),
          responses: { 200: c.type<{ data: ResCharacterPhasesForList[] }>() },
        },
      }),
    },
    'crowdfunding-spec': {
      ':characterCrowdfundingSpecId': c.router({
        $delete: {
          method: 'DELETE',
          path: 'admin/crowdfunding-spec/:characterCrowdfundingSpecId',
          query: c.type<undefined>(),
          body: c.type<undefined>(),
          responses: { 200: c.type<undefined>() },
        },
      }),
      ':characterSpecId': c.router({
        $put: {
          method: 'PUT',
          path: 'admin/crowdfunding-spec/:characterSpecId',
          query: c.type<undefined>(),
          body: c.type<vCrowdfundingSpecUpdate>(),
          responses: { 200: c.type<undefined>() },
        },
      }),
      ':characterId': c.router({
        $post: {
          method: 'POST',
          path: 'admin/crowdfunding-spec/:characterId',
          query: c.type<undefined>(),
          body: c.type<vCrowdfundingSpecCreate>(),
          responses: { 200: c.type<undefined>() },
        },
        $get: {
          method: 'GET',
          path: 'admin/crowdfunding-spec/:characterId',
          query: c.type<undefined>(),
          responses: { 200: c.type<{ data: ResCrowdfundingSpecList[] }>() },
        },
      }),
    },
    'crowdfunding': {
      ':characterId': c.router({
        $put: {
          method: 'PUT',
          path: 'admin/crowdfunding/:characterId',
          query: c.type<undefined>(),
          body: c.type<vCrowdfundingUpdate>(),
          responses: { 200: c.type<undefined>() },
        },
      }),
    },
    'login': {
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
    'order': {
      crowdfunding: c.router({
        $get: {
          method: 'GET',
          path: 'admin/order/crowdfunding',
          query: c.type<vCrowdfundingSupportQuery>(),
          responses: {
            200: c.type<{ data: AdminCrowdfundingSupportList[] }>(),
          },
        },
      }),
      figurine: c.router({
        $get: {
          method: 'GET',
          path: 'admin/order/figurine',
          query: c.type<vCharacterSaleOrderQuery>(),
          responses: { 200: c.type<{ data: AdminCharacterSaleOrderList[] }>() },
        },
      }),
    },
    'sale-spec': {
      ':characterSaleSpecId': c.router({
        $delete: {
          method: 'DELETE',
          path: 'admin/sale-spec/:characterSaleSpecId',
          query: c.type<undefined>(),
          body: c.type<undefined>(),
          responses: { 200: c.type<undefined>() },
        },
      }),
      ':characterSpecId': c.router({
        $put: {
          method: 'PUT',
          path: 'admin/sale-spec/:characterSpecId',
          query: c.type<undefined>(),
          body: c.type<vSaleSpecUpdate>(),
          responses: { 200: c.type<undefined>() },
        },
      }),
      ':characterId': c.router({
        $post: {
          method: 'POST',
          path: 'admin/sale-spec/:characterId',
          query: c.type<undefined>(),
          body: c.type<vSaleSpecCreate>(),
          responses: { 200: c.type<undefined>() },
        },
        $get: {
          method: 'GET',
          path: 'admin/sale-spec/:characterId',
          query: c.type<undefined>(),
          responses: { 200: c.type<{ data: ResSaleSpecList[] }>() },
        },
      }),
    },
    'sale': {
      ':characterId': c.router({
        $put: {
          method: 'PUT',
          path: 'admin/sale/:characterId',
          query: c.type<undefined>(),
          body: c.type<vSaleUpdate>(),
          responses: { 200: c.type<undefined>() },
        },
      }),
    },
    'user': {
      list: c.router({
        $get: {
          method: 'GET',
          path: 'admin/user/list',
          query: c.type<vUserListAdminQuery>(),
          responses: { 200: c.type<{ data: ResUserListForAdmin[] }>() },
        },
      }),
    },
    'vote': {
      ':characterId': c.router({
        $put: {
          method: 'PUT',
          path: 'admin/vote/:characterId',
          query: c.type<undefined>(),
          body: c.type<vVoteUpdate>(),
          responses: { 200: c.type<undefined>() },
        },
      }),
    },
  },
}
