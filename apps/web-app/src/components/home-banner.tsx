import { $qc } from '@/query-client'
import { QueryData } from './query-data'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'
import { Image } from './ui/image'

export function HomeBanner() {
  return (
    <QueryData
      queryRoute={$qc.system['home-banner'].$get}
      queryArgs={{}}
      renderData={({ data }) => {
        if (data.length === 0) {
          return null
        }

        return (
          <Carousel>
            <CarouselContent className="w-full h-[375px]">
              {data.map(item => (
                <CarouselItem
                  key={item.image}
                  onClick={() => {
                    window.open(item.link, '_blank')
                  }}
                  className="w-full h-full"
                >
                  <Image src={item.image} alt={item.description} className="w-full h-full object-cover" />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )
      }}
    />
  )
}
