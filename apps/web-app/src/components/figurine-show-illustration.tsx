import type { ResFigurineShow } from '@inspin/interfaces'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'
import { Image } from './ui/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { VoteShowIllustration } from './vote-show-illustration'

export function FigurineShowIllustration({ data }: { data: ResFigurineShow }) {
  const crowdfundingImages = data.crowdfunding.images || []
  const saleImages = data.sale.images || []
  return (
    <Tabs defaultValue="c_s_sale" className="bg-gray-100 relative">
      <TabsContent value="c_s_sale">
        <Carousel>
          <CarouselContent className="w-full h-[375px]">
            {crowdfundingImages.map(image => (
              <CarouselItem key={image}>
                <Image src={image} alt={data.name} className="w-full h-full object-cover" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </TabsContent>
      <TabsContent value="c_s_crowdfunding">
        <Carousel>
          <CarouselContent className="w-full h-[375px]">
            {saleImages.map(image => (
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
        <TabsTrigger value="c_s_sale">Photo</TabsTrigger>
        <TabsTrigger value="c_s_crowdfunding">3D Model</TabsTrigger>
        <TabsTrigger value="c_s_vote">Illustration</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
