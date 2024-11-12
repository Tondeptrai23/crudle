export interface CheckboxItem {
  id: string;
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface FilterOption {
  label?: string;
  labelIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  type: 'enum' | 'range';
}

export interface RangeFilterOption extends FilterOption {
  min: number;
  max: number;
  step?: number;
  onChange?: (value: [number, number]) => void;
  type: 'range';
}

export interface EnumFilterOption extends FilterOption {
  items?: CheckboxItem[];
  onChange?: (ids: string[]) => void;
  type: 'enum';
}
