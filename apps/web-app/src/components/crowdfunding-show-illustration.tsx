import type { ResCrowdfundingShow } from '@inspin/interfaces'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'
import { Image } from './ui/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { VoteShowIllustration } from './vote-show-illustration'

export function CrowdfundingShowIllustration({ data }: { data: ResCrowdfundingShow }) {
  const images = data.crowdfunding.images || []
  return (
    <Tabs defaultValue="c_s_crowdfunding" className="bg-gray-100 relative">
      <TabsContent value="c_s_crowdfunding">
        <Carousel>
          <CarouselContent className="w-full h-[375px]">
            {images.map(image => (
              <CarouselItem key={image}>
                <Image src={image} alt={data.name} className="w-full h-full object-cover" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </TabsContent>
      <TabsContent value="c_s_vote">
        <VoteShowIllustration data={data} />
      </TabsContent>
      <TabsList className="absolute bottom-2 left-2">
        <TabsTrigger value="c_s_crowdfunding">3D Model</TabsTrigger>
        <TabsTrigger value="c_s_vote">Illustration</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
