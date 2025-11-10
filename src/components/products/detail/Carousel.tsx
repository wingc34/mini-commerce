import React, { useState, useEffect, useCallback } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { Thumb } from './CarouselThumbsButton';

type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
};

const Carousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on('select', onSelect).on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div
      className="max-w-3xl mx-auto"
    >
      <div
        className="overflow-hidden"
        ref={emblaMainRef}
      >
        <div
          className="flex touch-pan-y touch-pinch-zoom ml-[calc(var(--slide-spacing)*-1)]"
        >
          {slides.map((ele, index) => (
            <div
              className="transform translate-x-0 translate-y-0 translate-z-0 flex-[0_0_var(--slide-size)] min-w-0 pl-(--slide-spacing)"
              key={index}
            >
              <div
                className="rounded-[1.8rem] text-[4rem] font-semibold flex items-center justify-center h-(--slide-height) select-none"
              >
                <img
                  src={ele || '/placeholder.svg'}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="mt-(--thumbs-slide-spacing)"
      >
        <div
          className="overflow-hidden"
          ref={emblaThumbsRef}
        >
          <div
            className="flex flex-row -ml-(--thumbs-slide-spacing)"
          >
            {slides.map((ele, index) => (
              <Thumb
                image={ele}
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
