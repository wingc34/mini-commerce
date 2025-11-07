'use client';

import * as React from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function PriceFilter() {
  const [range, setRange] = React.useState<[number, number]>([2000, 8000]);

  return (
    <div className="w-full max-w-sm space-y-4">
      {/* 標題 */}
      <Label className="text-lg font-semibold text-foreground">商品價格</Label>

      {/* Range Slider */}
      <div className="flex flex-col items-center space-y-4">
        <Slider
          value={range}
          onValueChange={(val: unknown) => setRange(val as [number, number])}
          min={0}
          max={10000}
          step={100}
          className="w-full"
        />
      </div>

      {/* 價格輸入框 */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-textSecondary">
            HKD
          </span>
          <Input
            type="number"
            min={0}
            value={range[0]}
            onChange={(e) =>
              setRange([+e.target.value, Math.max(+e.target.value, range[1])])
            }
            className="pr-6 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>

        <span className="text-textSecondary">~</span>

        <div className="relative flex-1">
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-textSecondary">
            HKD
          </span>
          <Input
            type="number"
            value={range[1]}
            min={0}
            onChange={(e: { target: { value: string | number } }) =>
              setRange([Math.min(+e.target.value, range[0]), +e.target.value])
            }
            className="pr-6 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>
    </div>
  );
}
