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
      <Header.SubPage title="账户设置" />
      <GuardAuthPage>
        <div className="p-4 max-w-2xl mx-auto space-y-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <IconUserLine className="size-6 text-blue-600" />
                <div>
                  <CardTitle>个人资料设置</CardTitle>
                  <CardDescription>管理您的个人资料信息</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                更新您的个人资料信息，包括昵称、头像和简介。
              </p>
              <Button
                variant="outline"
                onClick={() => navigate('/account/profile')}
                className="w-full"
              >
                编辑个人资料
              </Button>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <IconPassword className="size-6 text-green-600" />
                <div>
                  <CardTitle>修改密码</CardTitle>
                  <CardDescription>更新您的账户密码</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                修改密码以保护您的账户安全。
              </p>
              <Button
                variant="outline"
                onClick={() => navigate('/account/change-password')}
                className="w-full"
              >
                修改密码
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
                  <CardTitle className="text-red-700">删除账户</CardTitle>
                  <CardDescription className="text-red-600">
                    永久删除您的账户和所有数据
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-600 mb-4">
                此操作无法撤销。您的所有数据，包括活动、订单和个人信息都将被永久删除。
              </p>
              <Button
                variant="destructive"
                onClick={() => navigate('/account/delete-account')}
                className="w-full"
              >
                删除账户
              </Button>
            </CardContent>
          </Card>
        </div>
      </GuardAuthPage>
    </MainLayout>
  )
}
