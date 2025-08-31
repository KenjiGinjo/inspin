import type { ResCharacterPhasesForList } from '@inspin/interfaces'
import { getCharacterKit, getCharacterPhase } from '@inspin/tools/both'
import { navigate } from 'wouter/use-browser-location'
import { Analysis } from './analysis'
import { Divider } from './ui/divider'
import { Image } from './ui/image'

export function CampaignList({ data }: { data: ResCharacterPhasesForList }) {
  const phase = getCharacterPhase(data, 'en')
  const kit = getCharacterKit(data)

  if (kit === 'vote') {
    const vote = data.vote as unknown as any

    return (
      <div
        className="relative w-full h-[250px] rounded overflow-hidden border border-gray-200 border-solid"
        onClick={() => {
          navigate(`/vote/show/${data.id}`)
        }}
      >
        <Image src={data.illustration || ''} alt={data.name} className="w-full h-full object-cover" />
        <div className="w-full absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-t from-black to-transparent flex flex-col items-center justify-end p-2">
          <div className="text-white font-bold">{data.name}</div>
          <div className="flex items-center gap-2 justify-around">
            <Analysis.View count={data.countView} className="text-white" />
            <Analysis.Collection count={data.countCollect} className="text-white" />
            <Divider orientation="vertical" className="h-2" />
            <div className="text-white text-xs">
              {((vote.countCurrent / vote.countTarget) * 100).toFixed(1)}
              %
            </div>
          </div>
        </div>
        <span className="absolute top-2 left-0 right-0 bg-gray-200 h-5 text-gray-700 text-xs px-2">
          {phase}
        </span>
      </div>
    )
  }

  if (kit === 'crowdfunding') {
    const crowdfunding = data.crowdfunding as unknown as any

    return (
      <div
        className="relative w-full h-[250px] rounded overflow-hidden border border-gray-200 border-solid"
        onClick={() => {
          navigate(`/crowdfunding/show/${data.id}`)
        }}
      >
        <Image src={crowdfunding.images?.[0] || ''} alt={data.name} className="w-full h-full object-cover" />
        <div className="w-full absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-t from-black to-transparent flex flex-col items-center justify-end p-2">
          <div className="text-white font-bold">{data.name}</div>
          <div className="flex items-center gap-2 justify-around">
            <Analysis.View count={data.countView} className="text-white" />
            <Analysis.Collection count={data.countCollect} className="text-white" />
            <Divider orientation="vertical" className="h-2" />
            <div className="text-white text-xs">
              {((crowdfunding.countCurrent / crowdfunding.countTarget) * 100).toFixed(1)}
              %
            </div>
          </div>
        </div>
        <span className="absolute top-2 left-0 right-0 bg-green-200 h-5 text-gray-700 text-xs px-2">
          {phase}
        </span>
      </div>
    )
  }

  if (kit === 'sale') {
    const sale = data.sale as unknown as any
    return (
      <div
        className="relative w-full h-[250px] rounded overflow-hidden border border-gray-200 border-solid"
        onClick={() => {
          navigate(`/figurines/show/${data.id}`)
        }}
      >
        <Image src={sale.images?.[0] || ''} alt={data.name} className="w-full h-full object-cover" />
        <div className="w-full absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-t from-black to-transparent flex flex-col items-center justify-end p-2">
          <div className="text-white font-bold">{data.name}</div>
          <div className="flex items-center gap-2 justify-around">
            <Analysis.View count={data.countView} className="text-white" />
            <Analysis.Collection count={data.countCollect} className="text-white" />
            <Divider orientation="vertical" className="h-2" />
          </div>
        </div>
        <span className="absolute top-2 left-0 right-0 bg-green-200 h-5 text-gray-700 text-xs px-2">
          {phase}
        </span>
      </div>
    )
  }

  return null
}
