import type { ResCrowdfundingShow } from '@inspin/interfaces'
import { APP } from '@inspin/constants'
import { EnumPayIntentType } from '@inspin/enums'
import { vCharacterCrowdfundingSupport } from '@inspin/validations'
import { get } from 'radash'
import { navigate } from 'wouter/use-browser-location'
import { useSchemaPatch } from '@/hooks'
import { $qc } from '@/query-client'
import { Form } from './form'
import { Button } from './ui/button'
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer'

export function CrowdfundingSupportDrawer({ data }: { data: ResCrowdfundingShow }) {
  const specs = data.crowdfunding.specs

  const { form, dto, patch } = useSchemaPatch(vCharacterCrowdfundingSupport, {
    characterId: data.id,
    specId: specs[0].id,
  })
  const selectedRewardDiamond = specs.find(spec => spec.id === dto.specId)?.diamond || 0

  return (
    <Drawer direction="bottom">
      <DrawerTrigger asChild>
        <Button className="w-full mt-4">Support Now</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Support Amount</DrawerTitle>
        </DrawerHeader>
        <Form.Form form={form} onChange={patch}>
          <div className="p-4 pb-0 flex justify-center">
            <Form.Radio
              label=""
              size="large"
              name="specId"
              items={specs.map(spec => ({ label: `${APP.currencySymbol}${spec.price}`, value: spec.id }))}
            />
          </div>
        </Form.Form>
        <DrawerDescription className="px-4 mb-6">
          By supporting this campaign, you'll help bring this figurine to life. If the goal is reached, we'll move it into production, and you'll earn a bonus of
          <span className="font-bold mx-1">
            {`${selectedRewardDiamond} diamonds`}
          </span>
        </DrawerDescription>
        <DrawerFooter>
          <Form.Submit
            form={form}
            authGuard
            request={() => $qc['crowdfunding-support'].$post.mutation({ body: dto })}
            onSuccess={(res) => {
              const supportId = get(res, 'body.data.supportId')
              navigate(`/pay/check-out/${supportId}/${EnumPayIntentType.CrowdfundingSupport}`, { replace: true })
            }}
          >
            <Button className="w-full font-bold">Confirm To Pay</Button>
          </Form.Submit>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
