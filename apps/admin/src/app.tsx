import { Route, Switch } from 'wouter'
import { PageAdmin } from './pages/admin'
import { PageLogin } from './pages/login'
import { NotFound } from './pages/not-found'

export function App() {
  return (
    <Switch>
      <Route path="/" component={PageLogin} />
      <Route path="/a" nest>
        <Route component={PageAdmin} />
      </Route>
      <Route component={NotFound} />
    </Switch>
  )
}
