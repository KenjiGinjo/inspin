import type { ResCrowdfundingList } from '@inspin/interfaces'
import { navigate } from 'wouter/use-browser-location'
import { Analysis } from './analysis'
import { Divider } from './ui/divider'
import { Image } from './ui/image'

export function CrowdfundingList({ data, showTag = false }: {
  data: ResCrowdfundingList
  showTag?: boolean
}) {
  return (
    <div
      className="relative w-full h-[250px] rounded overflow-hidden border border-gray-200 border-solid"
      onClick={() => {
        navigate(`/crowdfunding/show/${data.id}`)
      }}
    >
      <Image src={data.crowdfunding.images?.[0] || ''} alt={data.name} className="w-full h-full object-cover" />
      <div className="w-full absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-t from-black to-transparent flex flex-col items-center justify-end p-2">
        <div className="text-white font-bold">{data.name}</div>
        <div className="flex items-center gap-2 justify-around">
          <Analysis.View count={data.countView} className="text-white" />
          <Analysis.Collection count={data.countCollect} className="text-white" />
          <Divider orientation="vertical" className="h-2" />
          <div className="text-white text-xs">
            {((data.crowdfunding.countCurrent / data.crowdfunding.countTarget) * 100).toFixed(1)}
            %
          </div>
        </div>
      </div>
      {showTag && (
        <div className="absolute top-2 left-0 right-0 flex flex-col items-center justify-center bg-blue-200 w-[90px] h-5 rounded-r-md shadow">
          <div className="text-gray-700 text-xs">
            Crowdfunding
          </div>
        </div>
      )}
    </div>
  )
}
