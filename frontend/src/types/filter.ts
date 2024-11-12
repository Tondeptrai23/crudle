export interface CheckboxItem {
  id: string;
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface FilterOption {
  label?: string;
  type?: 'enum' | 'range';
  labelIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  items?: CheckboxItem[];
  onChange?: (ids: string[]) => void;
}
