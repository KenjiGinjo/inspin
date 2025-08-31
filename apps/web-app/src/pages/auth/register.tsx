import { vAuthRegister } from '@inspin/validations'
import { get } from 'radash'
import { Link } from 'wouter'
import { signin } from '@/components/auth/signin'
import { Form } from '@/components/form'
import { MainLayout } from '@/components/layout'
import { Slogan } from '@/components/slogan'
import { Button } from '@/components/ui/button'
import { useSchemaPatch } from '@/hooks'
import { useUserState } from '@/hooks/user'
import { navBack } from '@/lib/navback'
import { $qc } from '@/query-client'

export function PageAuthRegister() {
  const { form, dto, patch } = useSchemaPatch(vAuthRegister)
  const { refetch } = useUserState()

  return (
    <MainLayout>
      <Slogan.Icon text="开始你的冒险之旅!" className="mt-[60px]" />
      <div className="p-4">
        <Form.Form form={form} onChange={patch}>
          <Form.Input label="用户名" name="username" placeholder="请输入用户名" />
          <Form.Input label="密码" name="password" type="password" placeholder="请输入密码" />
          <Form.Input label="确认密码" name="confirmPassword" type="password" placeholder="请再次输入密码" />
        </Form.Form>
        <Form.Submit
          form={form}
          request={() => $qc.authentication['register-by-username'].$post.mutation({ body: dto })}
          onSuccess={async (res) => {
            const meta = get(res, 'body.meta', undefined)
            await signin(meta)
            await refetch()
            navBack('/user', true)
          }}
        >
          <Button
            disabled={!form.formState.isValid || dto.password !== dto.confirmPassword}
            className="w-full rounded-full mt-4 font-bold"
          >
            注 册
          </Button>
        </Form.Submit>
        <div className="mt-4 text-center">
          <span className="text-gray-500">已有账号？</span>
          <Link to="/auth/login">
            <Button variant="link" className="p-0 h-auto font-normal">
              立即登录
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  )
}
