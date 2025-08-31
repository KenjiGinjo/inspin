import { Route, Switch } from 'wouter'
import { GuardAuthPage } from '@/components/guard'
import { AppSidebar } from '@/components/sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { NotFound } from '../not-found'
import PageHome from './home'

export function PageAdmin() {
  return (
    <GuardAuthPage>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex sticky z-10 top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
          </header>
          <Switch>
            <Route path="/" component={PageHome} />
            <Route component={NotFound} />
          </Switch>
        </SidebarInset>
      </SidebarProvider>
    </GuardAuthPage>
  )
}
