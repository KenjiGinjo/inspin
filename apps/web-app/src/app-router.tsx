import { Route, Switch } from 'wouter'
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
      <Route path="/regrets" component={PageRegrets} />
      <Route path="/user" component={PageUser} />
      <Route path="/auth/login" component={PageAuthLogin} />
      <Route path="/auth/register" component={PageAuthRegister} />

      <Route component={PageNotFound} />
    </Switch>
  )
}
