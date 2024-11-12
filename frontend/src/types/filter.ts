export interface CheckboxItem {
  id: string;
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface BaseFilterOption {
  id: string;
  label?: string;
  labelIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  type: 'enum' | 'range';
}

export interface RangeFilterOption extends BaseFilterOption {
  min: number;
  max: number;
  value?: [number, number];
  step?: number;
  onChange?: (value: [number, number]) => void;
  type: 'range';
}

export interface EnumFilterOption extends BaseFilterOption {
  items?: CheckboxItem[];
  onChange?: (ids: string[]) => void;
  type: 'enum';
}

export type FilterParams = string[] | [number, number];

export type FilterOption = RangeFilterOption | EnumFilterOption;
