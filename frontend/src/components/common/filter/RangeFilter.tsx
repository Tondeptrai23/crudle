import { Button } from '@/components/common/ui/button';
import { Input } from '@/components/common/ui/input'; // Add this import
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/common/ui/popover';
import { Slider } from '@/components/common/ui/slider';
import { useEffect, useState } from 'react';

interface RangeFilterOption {
  label: string;
  labelIcon?: React.ComponentType<{ className?: string }>;
  min: number;
  max: number;
  step?: number;
  onChange?: (range: [number, number]) => void;
}

const RangeFilter: React.FC<RangeFilterOption> = ({
  label,
  labelIcon: LabelIcon,
  min,
  max,
  step = 1,
  onChange,
}) => {
  const [range, setRange] = useState<[number, number]>([min, max]);
  const [inputValues, setInputValues] = useState({
    min: range[0].toString(),
    max: range[1].toString(),
  });

  useEffect(() => {
    setInputValues({
      min: range[0].toString(),
      max: range[1].toString(),
    });
  }, [range]);

  const handleSliderChange = (newValues: number[]) => {
    const newRange: [number, number] = [newValues[0], newValues[1]];
    setRange(newRange);
    onChange?.(newRange);
  };

  const handleInputChange = (value: string, isMin: boolean) => {
    setInputValues((prev) => ({
      ...prev,
      [isMin ? 'min' : 'max']: value,
    }));

    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;

    let newRange: [number, number];
    if (isMin) {
      newRange = [Math.min(Math.max(numValue, min), range[1]), range[1]];
    } else {
      newRange = [range[0], Math.max(Math.min(numValue, max), range[0])];
    }

    setRange(newRange);
    onChange?.(newRange);
  };

  const clearRange = () => {
    const defaultRange: [number, number] = [min, max];
    setRange(defaultRange);
    onChange?.(defaultRange);
  };

  const hasCustomRange = range[0] !== min || range[1] !== max;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline'>
          {LabelIcon && <LabelIcon className='mr-2 h-4 w-4' />}
          {label}
          {hasCustomRange && (
            <span className='ml-2 text-sm text-muted-foreground'>
              {range[0]} - {range[1]}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[280px] p-4'>
        <div className='space-y-5'>
          {/* Slider */}
          <div className='pt-4'>
            <Slider
              defaultValue={[25, 75]}
              min={min}
              max={max}
              step={step}
              value={[range[0], range[1]]}
              onValueChange={handleSliderChange}
              className='mt-6'
            />
          </div>

          {/* Number Inputs */}
          <div className='flex items-center space-x-2'>
            <Input
              type='number'
              value={inputValues.min}
              onChange={(e) => handleInputChange(e.target.value, true)}
              min={min}
              max={max}
              step={step}
              className='w-20'
            />
            <span className='text-muted-foreground'>to</span>
            <Input
              type='number'
              value={inputValues.max}
              onChange={(e) => handleInputChange(e.target.value, false)}
              min={min}
              max={max}
              step={step}
              className='w-20'
            />
          </div>

          {hasCustomRange && (
            <Button
              onClick={clearRange}
              variant='outline'
              className='h-8 w-full'
            >
              Clear Range
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default RangeFilter;
