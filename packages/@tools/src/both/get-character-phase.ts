import { EnumCharacterCrowdfundingStatus, EnumCharacterSaleStatus, EnumCharacterStatus, EnumCharacterVoteStatus } from '@inspin/enums'
import { isAfter } from 'date-fns'

const defaultPhase = '未获取到状态'

export function getCharacterPhase(data: unknown, language: 'zh' | 'en' = 'zh') {
  if (!data || typeof data !== 'object') {
    return defaultPhase
  }

  // Type assertion to safely access properties
  const obj = data as Record<string, any>

  if (obj['status'] === EnumCharacterStatus.Rejected) {
    return language === 'zh' ? '已驳回' : 'Rejected by op'
  }

  if (obj['sale']?.['status'] === EnumCharacterSaleStatus.Active) {
    if (obj['sale']?.['preSaleEndAt'] && isAfter(obj['sale']['preSaleEndAt'], new Date())) {
      return language === 'zh' ? '预售中' : 'On Pre-sale'
    }

    if (obj['sale']?.['salePrice']) {
      return language === 'zh' ? '正在销售' : 'On Sale'
    }
  }

  if (obj['crowdfunding']?.['status'] === EnumCharacterCrowdfundingStatus.Active) {
    return language === 'zh' ? '众筹中' : 'On Crowdfunding'
  }

  if (obj['crowdfunding']?.['status'] === EnumCharacterCrowdfundingStatus.SuccessPending) {
    return language === 'zh' ? '众筹成功' : 'Crowdfunding Success'
  }

  if (obj['crowdfunding']?.['status'] === EnumCharacterCrowdfundingStatus.Failed) {
    return language === 'zh' ? '众筹失败' : 'Crowdfunding Failed'
  }

  if (obj['crowdfunding']?.['status'] === EnumCharacterCrowdfundingStatus.Ended) {
    return language === 'zh' ? '众筹结束' : 'Crowdfunding Ended'
  }

  if (obj['vote']?.['status'] === EnumCharacterVoteStatus.Active) {
    return language === 'zh' ? '投票中' : 'On Voting'
  }

  if (obj['vote']?.['status'] === EnumCharacterVoteStatus.Ended) {
    return language === 'zh' ? '投票结束' : 'Voting Ended'
  }

  if (obj['status'] === EnumCharacterStatus.Pending) {
    return language === 'zh' ? '待审核' : 'Waiting for op review'
  }

  return defaultPhase
}

export function getCharacterKit(data: unknown): 'vote' | 'crowdfunding' | 'sale' {
  if (!data || typeof data !== 'object') {
    return 'vote'
  }

  const obj = data as Record<string, any>

  if (obj['status'] === EnumCharacterStatus.Rejected) {
    return 'vote'
  }

  if (obj['sale']?.['status'] === EnumCharacterSaleStatus.Active) {
    if (obj['sale']?.['preSaleEndAt'] && isAfter(obj['sale']['preSaleEndAt'], new Date())) {
      return 'sale'
    }

    if (obj['sale']?.['salePrice']) {
      return 'sale'
    }
  }

  if (obj['crowdfunding']?.['status'] === EnumCharacterCrowdfundingStatus.Active) {
    return 'crowdfunding'
  }

  if (obj['crowdfunding']?.['status'] === EnumCharacterCrowdfundingStatus.SuccessPending) {
    return 'crowdfunding'
  }

  if (obj['crowdfunding']?.['status'] === EnumCharacterCrowdfundingStatus.Failed) {
    return 'crowdfunding'
  }

  if (obj['crowdfunding']?.['status'] === EnumCharacterCrowdfundingStatus.Ended) {
    return 'crowdfunding'
  }

  return 'vote'
}
