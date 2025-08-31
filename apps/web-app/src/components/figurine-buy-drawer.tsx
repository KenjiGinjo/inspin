import type { ResFigurineShow } from '@inspin/interfaces'
import { APP } from '@inspin/constants'
import { EnumPayIntentType } from '@inspin/enums'
import { vFigurineItem } from '@inspin/validations'
import { isAfter } from 'date-fns'
import { get } from 'radash'
import React from 'react'
import { navigate } from 'wouter/use-browser-location'
import { useSchemaPatch } from '@/hooks'
import { cn } from '@/lib/utils'
import { $qc } from '@/query-client'
import { Form } from './form'
import { Price } from './price'
import { Button } from './ui/button'
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer'
import { Image } from './ui/image'

interface FigurineBuyDrawerProps {
  data: ResFigurineShow
  buttonText: string
  buttonClassName?: string
}

export function FigurineBuyDrawer({ data, buttonText, buttonClassName }: FigurineBuyDrawerProps) {
  const specs = data.sale.specs
  const isPreSale = isAfter(data.sale.preSaleEndAt, new Date())
  const [selectedSpec, setSelectedSpec] = React.useState(specs[0])

  const { form, dto, patch } = useSchemaPatch(vFigurineItem, {
    characterSaleSpecId: specs[0].id,
    quantity: 1,
    price: isPreSale ? specs[0].preSalePrice : specs[0].price,
    characterSaleSpecTitle: specs[0].title,
    characterSaleSpecImage: specs[0].image,
    characterName: data.name,
  })

  React.useEffect(() => {
    const _spec = specs.find(spec => spec.id === dto.characterSaleSpecId)

    if (!_spec) {
      return
    }

    setSelectedSpec(_spec)

    form.setValue('price', isPreSale
      ? _spec.preSalePrice
      : _spec.price)
    form.setValue('characterSaleSpecTitle', _spec.title)
    form.setValue('characterSaleSpecImage', _spec.image)
    form.setValue('quantity', _spec.stock > 0 ? 1 : 0)
  }, [dto.characterSaleSpecId, form, specs, isPreSale])

  return (
    <Drawer direction="bottom">
      <DrawerTrigger asChild>
        <Button className={cn('w-full', buttonClassName)}>{buttonText}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Buy figurine</DrawerTitle>
        </DrawerHeader>
        <Form.Form form={form} onChange={patch}>
          <div className="p-4">
            <div className="flex items-center gap-4 mb-2">
              <Image src={selectedSpec.image || ''} alt={selectedSpec.title} className="size-24 rounded shrink-0" />
              <div>
                {selectedSpec.stock > 0
                  ? (
                      <div className="text-green-500 font-bold">
                        In Stock
                        <span className="text-sm text-gray-500 font-normal ml-1">
                          {`(${selectedSpec.stock} left)`}
                        </span>
                      </div>
                    )
                  : <div className="text-red-500 font-bold">Out of Stock</div>}
                {isPreSale
                  ? <Price price={selectedSpec.price} discountPrice={selectedSpec.preSalePrice} size="sm" />
                  : <Price price={selectedSpec.price} size="sm" />}
                <div className="text-sm text-gray-500 font-normal mt-1 line-clamp-2">
                  {selectedSpec.description}
                </div>
              </div>
            </div>
            <Form.Radio
              label="Specs"
              name="characterSaleSpecId"
              items={specs.map(spec => ({ label: spec.title, value: spec.id }))}
            />
            <div className="w-2/4">
              <Form.InputStep
                label="Quantity"
                name="quantity"
                min={1}
                max={selectedSpec.stock}
                step={1}
              />
            </div>
          </div>
        </Form.Form>
        <DrawerDescription suppressHydrationWarning className="px-4 text-gray-700 flex justify-between items-end">
          <span>Total Price:</span>
          <span className="font-bold text-2xl">
            {` ${APP.currencySymbol}${isPreSale
              ? (Number(selectedSpec.preSalePrice) * dto.quantity).toFixed(2)
              : (Number(selectedSpec.price) * dto.quantity).toFixed(2)} `}
          </span>
        </DrawerDescription>
        <DrawerFooter>
          <Form.Submit
            form={form}
            authGuard
            request={() => $qc.figurine.buy.$post.mutation({ body: [dto] })}
            onSuccess={(res) => {
              const characterSaleOrderId = get(res, 'body.data.characterSaleOrderId')
              navigate(`/pay/check-out/${characterSaleOrderId}/${EnumPayIntentType.Figurine}`, { replace: true })
            }}
          >
            <Button disabled={selectedSpec.stock === 0} className="w-full font-bold">
              Confirm To Buy
            </Button>
          </Form.Submit>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
