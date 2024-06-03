'use client'
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import AutoScroll from 'embla-carousel-auto-scroll'
import Image from 'next/image'

export function EmblaCarousel({slides, testimonials} : {slides: number[],testimonials: string[]}) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [AutoScroll({ playOnInit: true, speed: 1})])
  const arr = [1,2,3,4,5,6]
  return (
    <section className="embla relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide  mx-auto h-full mx-[1%]" key={index}>
              <div className='relative max-w-[90%] h-[300px]'>
                <Image 
                  src={require(`../../../../../public/testimonial1.png`)} 
                  alt={''}
                  className="rounded-md object-cover object-center"
                  fill
                ></Image>
              </div>
              <div className="embla__slide__number max-w-[400px] text-[white] pt-2.5">
                <span className="text-[white]">
              
                </span> 
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
