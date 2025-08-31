import { Route, Switch } from 'wouter'
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

      <Route component={PageNotFound} />
    </Switch>
  )
}
