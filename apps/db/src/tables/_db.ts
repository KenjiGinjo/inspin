import { orchidORM } from 'orchid-orm'
import { ENV } from '../env'
import { TableAdmin } from './admin'
import { TableArticle } from './article'
import { TableCharacter } from './character'
import { TableCharacterCollect } from './character-collect'
import { TableCharacterCrowdfunding } from './character-crowdfunding'
import { TableCharacterCrowdfundingSpec } from './character-crowdfunding-spec'
import { TableCharacterCrowdfundingSupport } from './character-crowdfunding-support'
import { TableCharacterSale } from './character-sale'
import { TableCharacterSaleOrder } from './character-sale-order'
import { TableCharacterSaleSpec } from './character-sale-spec'
import { TableCharacterVote } from './character-vote'
import { TableCharacterVoteSupport } from './character-vote-support'
import { TableErrorLog } from './error-log'
import { TableExtraInfo } from './extra-info'
import { TableProfile } from './profile'
import { TableRaffle } from './raffle'
import { TableRaffleEntryRecord } from './raffle-entry-record'
import { TableSession } from './session'
import { TableSystemConfig } from './system-config'
import { TableUser } from './user'
import { TableUserAddress } from './user-address'
import { TableUserVoteTokenRecord } from './user-vote-token-record'

export const db = orchidORM(
  {
    log: ENV.DATABASE_LOG,
    databaseURL: ENV.DATABASE_URL,
  },
  {
    admin: TableAdmin,
    article: TableArticle,
    character: TableCharacter,
    characterCollect: TableCharacterCollect,
    characterCrowdfunding: TableCharacterCrowdfunding,
    characterCrowdfundingSpec: TableCharacterCrowdfundingSpec,
    characterCrowdfundingSupport: TableCharacterCrowdfundingSupport,
    characterSale: TableCharacterSale,
    characterSaleSpec: TableCharacterSaleSpec,
    characterSaleOrder: TableCharacterSaleOrder,
    characterVote: TableCharacterVote,
    characterVoteSupport: TableCharacterVoteSupport,
    errorLog: TableErrorLog,
    extraInfo: TableExtraInfo,
    profile: TableProfile,
    session: TableSession,
    user: TableUser,
    userAddress: TableUserAddress,
    userVoteTokenRecord: TableUserVoteTokenRecord,
    raffle: TableRaffle,
    raffleEntryRecord: TableRaffleEntryRecord,
    systemConfig: TableSystemConfig,
  },
)
