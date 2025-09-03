import { Route, Switch } from 'wouter'
import { PageAccountChangePassword } from './pages/account/change-password'
import { PageAccountDeleteAccount } from './pages/account/delete-account'
import { PageAccountProfile } from './pages/account/profile'
import { PageAccountSettings } from './pages/account/settings'
import { PageAuthLogin } from './pages/auth/login'
import { PageAuthRegister } from './pages/auth/register'
import { PageHome } from './pages/home'
import { PageNotFound } from './pages/not-found'
import { PageRegrets } from './pages/regrets'
import { PageUser } from './pages/user'

export function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={PageHome} />

      <Route path="/account/profile" component={PageAccountProfile} />
      <Route path="/account/settings" component={PageAccountSettings} />
      <Route path="/account/change-password" component={PageAccountChangePassword} />
      <Route path="/account/delete-account" component={PageAccountDeleteAccount} />

      <Route path="/regrets" component={PageRegrets} />
      <Route path="/user" component={PageUser} />
      <Route path="/auth/login" component={PageAuthLogin} />
      <Route path="/auth/register" component={PageAuthRegister} />

      <Route component={PageNotFound} />
    </Switch>
  )
}
