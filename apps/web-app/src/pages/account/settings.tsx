import { IconDeleteBin6Line, IconPassword, IconUserLine } from '@inspin/svg'
import { navigate } from 'wouter/use-browser-location'
import { GuardAuthPage } from '@/components/guard'
import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Divider } from '@/components/ui/divider'

export function PageAccountSettings() {
  return (
    <MainLayout>
      <Header.SubPage title="Account Settings" />
      <GuardAuthPage>
        <div className="p-4 max-w-2xl mx-auto space-y-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <IconUserLine className="size-6 text-blue-600" />
                <div>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Manage your profile information</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Update your profile information including nickname, avatar, and bio.
              </p>
              <Button
                variant="outline"
                onClick={() => navigate('/account/profile')}
                className="w-full"
              >
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <IconPassword className="size-6 text-green-600" />
                <div>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your account password</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Change your password to keep your account secure.
              </p>
              <Button
                variant="outline"
                onClick={() => navigate('/account/change-password')}
                className="w-full"
              >
                Change Password
              </Button>
            </CardContent>
          </Card>

          <Divider />

          {/* Delete Account */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <IconDeleteBin6Line className="size-6 text-red-600" />
                <div>
                  <CardTitle className="text-red-700">Delete Account</CardTitle>
                  <CardDescription className="text-red-600">
                    Permanently remove your account and all data
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-600 mb-4">
                This action cannot be undone. All your data, including campaigns, orders, and personal information will be permanently deleted.
              </p>
              <Button
                variant="destructive"
                onClick={() => navigate('/account/delete-account')}
                className="w-full"
              >
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </GuardAuthPage>
    </MainLayout>
  )
}
