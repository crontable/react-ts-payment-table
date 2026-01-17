import { selectBoxStyle } from './SelectBox.styles';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

function SelectBox({ options, value, onChange, placeholder = 'All' }: SelectProps) {
  return (
    <select css={selectBoxStyle} value={value} onChange={(e) => onChange?.(e.target.value)}>
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SelectBox;
