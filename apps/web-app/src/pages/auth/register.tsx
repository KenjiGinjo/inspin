import { APP } from '@inspin/constants'
import { MainLayout } from '@/components/layout'
import { NotificationBar } from '@/components/notification-bar'

export function PageAuthRegister() {
  return (
    <MainLayout>
      <NotificationBar>
        {`${APP.appName} has updated the Privacy Policy as of June 29, 2025. Revision history`}
      </NotificationBar>
    </MainLayout>
  )
}
