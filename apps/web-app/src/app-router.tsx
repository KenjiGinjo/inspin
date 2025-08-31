import { Route, Switch } from 'wouter'
import { PageAccountCampaigns } from './pages/account/campaigns'
import { PageAccountChangePassword } from './pages/account/change-password'
import { PageAccountDeleteAccount } from './pages/account/delete-account'
import { PageAccountProfile } from './pages/account/profile'
import { PageAccountSettings } from './pages/account/settings'
import { PageAuthLogin } from './pages/auth/login'
import { PageCharacterContributors } from './pages/character/contributors'
import { PageCharacterCreate } from './pages/character/create'
import { PageCharacterEdit } from './pages/character/edit'
import { PageCompanyAboutUs } from './pages/company/about-us'
import { PageCompanyContactSupport } from './pages/company/contact-support'
import { PageCompanyFaq } from './pages/company/faq'
import { PageCrowdfundingList } from './pages/crowdfunding/list'
import { PageCrowdfundingShow } from './pages/crowdfunding/show'
import { PageCustomService } from './pages/docs/custom-service'
import { PagePrivacyPolicy } from './pages/docs/privacy-policy'
import { PageSubmissionRules } from './pages/docs/submission-rules'
import { PageTermsOfUse } from './pages/docs/terms-of-use'
import { PageExplore } from './pages/explore'
import { PageFigurines } from './pages/figurines'
import { PageFigurineList } from './pages/figurines/list'
import { PageFigurineShow } from './pages/figurines/show'
import { PageHome } from './pages/home'
import { PageNotFound } from './pages/not-found'
import { PageOrderList } from './pages/order/list'
import { PageOrderShow } from './pages/order/show'
import { PageCheckOut } from './pages/pay/check-out'
import { PagePaySuccess } from './pages/pay/success'
import { PageRaffleEntryRecord } from './pages/raffle/entry-record'
import { PageRaffleShow } from './pages/raffle/show'
import { PageUser } from './pages/user'
import { PageUserAddressCreate } from './pages/user-address/create'
import { PageUserAddressEdit } from './pages/user-address/edit'
import { PageUserAddressList } from './pages/user-address/list'
import { PageVoteList } from './pages/vote/list'
import { PageVoteShow } from './pages/vote/show'

export function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={PageHome} />
      <Route path="/explore" component={PageExplore} />
      <Route path="/user" component={PageUser} />

      <Route component={PageNotFound} />
    </Switch>
  )
}
