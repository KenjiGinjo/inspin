import type { ResRaffleShow } from '@inspin/interfaces'
import { Divider } from './ui/divider'
import { Image } from './ui/image'

export function RaffleShowHeader({ data }: { data: ResRaffleShow }) {
  return (
    <>
      <div className="relative">
        <Image src={data.raffle.image ?? ''} alt={data.raffle.title} className="w-full " />
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col items-center justify-center px-4">
          <div className="text-white text-xl font-bold">{data.raffle.title}</div>
          <div className="text-white text-sm mt-2">{data.raffle.description}</div>
        </div>
      </div>
      <Divider className="my-4" />
      <div className="text-gray-700 text-sm mt-4 font-bold">You are participating in the raffle for:</div>
      <div className="flex gap-4 items-end mt-4">
        <Image src={data.sale.spec.image ?? ''} alt={data.sale.spec.title} className="size-32 rounded shrink-0" />
        <div className="pb-2">
          <h1 className="text-xl font-bold text-gray-700">{data.name}</h1>
          <div className="text-xs text-gray-500">
            <p className="font-bold mt-2">
              {`Spec: ${data.sale.spec.title}`}
            </p>
            <p className="mt-1">
              {data.sale.spec.description}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-pink-100 rounded px-5 py-4 text-gray-500 flex justify-between items-center mt-4">
        <div className="text-sm">Entry Cost</div>
        <div className="flex items-start">
          <div className="text-2xl font-bold text-gray-700">{data.raffle.costDiamond}</div>
          <div className="text-xs mt-2 ml-2">diamond / entry</div>
        </div>
      </div>
    </>
  )
}
