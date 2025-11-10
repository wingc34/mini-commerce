import React from 'react';

type PropType = {
  image: string;
  selected: boolean;
  index: number;
  onClick: () => void;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { image, selected, index, onClick } = props;

  return (
    <div 
    className={'flex-[0_0_22%] min-w-0 pl-[var(--thumbs-slide-spacing)] sm:flex-[0_0_15%]'}
    >
      <button
        onClick={onClick}
        type="button"
        className="appearance-none bg-transparent touch-manipulation inline-flex no-underline cursor-pointer border-0 p-0 m-0 text-[1.8rem] font-semibold text-(--detail-high-contrast) items-center justify-center h-(--thumbs-slide-height) w-full"
      >
        <img
          src={image || '/placeholder.svg'}
          alt={`Product Thumb ${index + 1}`}
          className="object-contain"
        />
      </button>
    </div>
  );
};
