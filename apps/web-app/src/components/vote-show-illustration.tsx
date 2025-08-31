import type { ICharacterBase } from '@inspin/interfaces'
import { IconFullscreenLine } from '@inspin/svg'
import { Button } from './ui/button'
import { Image } from './ui/image'

export function VoteShowIllustration({ data }: { data: ICharacterBase }) {
  return (
    <div className="w-full h-[375px] relative">
      {data.illustration && <Image src={data.illustration} alt={data.name} className="w-full h-full object-cover" />}
      <Button variant="outline" size="icon" className="absolute bottom-3 right-2 bg-white rounded-xs shadow leading-none p-0">
        <IconFullscreenLine className="size-6 text-gray-700" />
      </Button>
    </div>
  )
}
