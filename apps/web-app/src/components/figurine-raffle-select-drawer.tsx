import type { ResFigurineShow } from '@inspin/interfaces'
import { IconVipDiamondFill } from '@inspin/svg'
import { vFigurineRaffleItem } from '@inspin/validations'
import React from 'react'
import { navigate } from 'wouter/use-browser-location'
import { useSchemaPatch } from '@/hooks'
import { Form } from './form'
import { Button } from './ui/button'
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer'
import { Image } from './ui/image'

interface FigurineRaffleSelectDrawerProps {
  data: ResFigurineShow
}

export function FigurineRaffleSelectDrawer({ data }: FigurineRaffleSelectDrawerProps) {
  const specs = data.sale.specs.filter(spec => spec.raffle)

  const { form, dto, patch } = useSchemaPatch(vFigurineRaffleItem, {
    characterSaleSpecId: specs[0].id,
  })
  const [selectedSpec, setSelectedSpec] = React.useState(specs[0])

  React.useEffect(() => {
    const _spec = specs.find(spec => spec.id === dto.characterSaleSpecId)
    setSelectedSpec(_spec || specs[0])
  }, [dto.characterSaleSpecId, form])

  return (
    <Drawer direction="bottom">
      <DrawerTrigger asChild>
        <Button
          disabled={specs.length === 0}
          className="w-9/24 bg-orange-500 rounded-full"
        >
          Enter Raffle
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Enter Raffle</DrawerTitle>
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
                <div className="flex items-center gap-1">
                  <IconVipDiamondFill className="size-4 text-blue-500" />
                  <div className="text-gray-700 font-bold">
                    {selectedSpec.raffle?.costDiamond}
                  </div>
                </div>
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
          </div>
        </Form.Form>
        <DrawerDescription suppressHydrationWarning className="px-4 text-gray-700 flex justify-between items-end">
          <span>Diamond Cost:</span>
          <span>
            <span className="font-bold text-2xl">
              {`${selectedSpec.raffle?.costDiamond} `}
            </span>
            <span>diamond</span>
          </span>
        </DrawerDescription>
        <DrawerFooter>
          <Button
            onClick={() => {
              navigate(`/raffle/show/${selectedSpec.id}`)
            }}
            disabled={specs.length === 0 || selectedSpec.stock === 0}
            className="w-full font-bold bg-orange-500"
          >
            Confirm To Enter Raffle
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
