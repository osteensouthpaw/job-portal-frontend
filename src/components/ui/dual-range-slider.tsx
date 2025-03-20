"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface DualRangeSliderProps
  extends React.ComponentProps<typeof SliderPrimitive.Root> {
  labelPosition?: "top" | "bottom";
  label?: (value: number) => React.ReactNode;
}

const DualRangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  DualRangeSliderProps
>(
  (
    { className, label, labelPosition = "top", onValueChange, value, ...props },
    ref
  ) => {
    const [sliderValue, setSliderValue] = React.useState<number[]>(
      Array.isArray(value) && value.length === 2
        ? value
        : [props.min || 1000, props.max || 200000]
    );

    return (
      <div className="relative">
        {/* Labels for the values */}
        {label && (
          <div className="flex justify-between mb-2">
            {sliderValue.map((val, index) => (
              <span key={index} className="text-sm text-primary font-medium">
                {label(val)}
              </span>
            ))}
          </div>
        )}

        <SliderPrimitive.Root
          ref={ref}
          className={cn(
            "relative flex w-full touch-none select-none items-center",
            className
          )}
          value={sliderValue}
          onValueChange={(newValue) => {
            setSliderValue(newValue);
            onValueChange?.(newValue);
          }}
          {...props}
        >
          <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
            <SliderPrimitive.Range className="absolute h-full bg-primary" />
          </SliderPrimitive.Track>

          {sliderValue.map((_, index) => (
            <SliderPrimitive.Thumb
              key={index}
              className="relative block h-3 w-3 rounded-full bg-primary border border-white shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary"
            />
          ))}
        </SliderPrimitive.Root>
      </div>
    );
  }
);
DualRangeSlider.displayName = "DualRangeSlider";

export { DualRangeSlider };
