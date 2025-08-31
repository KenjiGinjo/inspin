import { IconErrorWarningFill } from '@inspin/svg'
import { toast } from 'sonner'
import { navigate } from 'wouter/use-browser-location'
import { GuardAuthPage } from '@/components/guard'
import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { Request } from '@/components/request'
import { Button } from '@/components/ui/button'
import { $qc } from '@/query-client'

export function PageAccountDeleteAccount() {
  return (
    <MainLayout>
      <Header.SubPage title="Delete Account" />
      <GuardAuthPage>
        <div className="p-4 space-y-4">
          <div className="bg-red-100 border border-red-300 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <IconErrorWarningFill className="size-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-red-800 mb-2">This action cannot be undone</h4>
                <p className="text-sm text-red-700">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-medium text-red-800 mb-3">What will be deleted:</h4>
            <ul className="text-sm text-red-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-red-500">•</span>
                <span>All your campaigns and crowdfunding projects</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">•</span>
                <span>All your orders and crowdfunding support records</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">•</span>
                <span>Your profile information and personal data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">•</span>
                <span>Your account settings and preferences</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">•</span>
                <span>All associated files and uploads</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">💡 Before you proceed:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Make sure you have backed up any important data</li>
              <li>• Consider if you really need to delete your account</li>
              <li>• You can contact support if you have concerns</li>
            </ul>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => navigate('/account/settings')}
              className="flex-1"
            >
              Cancel
            </Button>

            <Request
              request={() => $qc.authentication['delete-account'].$delete.mutation({})}
              showLoading
              showModal
              showModalOption={{
                title: 'Final Confirmation',
                description: 'This is your final warning. Are you absolutely sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.',
              }}
              onSuccess={() => {
                toast.success('Account deleted successfully', {
                  description: 'Your account has been permanently removed',
                })
                navigate('/auth/login', { replace: true })
              }}

            >
              <Button
                variant="destructive"
                className="flex-1"
              >
                Delete Account Permanently
              </Button>
            </Request>
          </div>
        </div>
      </GuardAuthPage>
    </MainLayout>
  )
}
