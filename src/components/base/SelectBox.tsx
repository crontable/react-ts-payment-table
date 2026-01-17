import {
  containerStyle,
  triggerButtonStyle,
  dropdownMenuStyle,
  searchInputWrapperStyle,
  searchInputStyle,
  optionItemStyle,
  noResultsStyle,
} from './SelectBox.styles';
import { useSelectBox } from './useSelectBox';

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
  const {
    state: { isOpen, searchText, filteredOptions, selectedOption },
    ref: { containerRef, inputRef },
    action: { handleSelect, toggleDropdown, handleSearchChange },
  } = useSelectBox({ options, value, onChange });

  const displayText = selectedOption ? selectedOption.label : placeholder;

  const renderOptions = () => {
    if (filteredOptions.length === 0) {
      return <div css={noResultsStyle}>검색 결과가 없습니다</div>;
    }

    return filteredOptions.map((option) => (
      <div key={option.value} onClick={() => handleSelect(option.value)} css={optionItemStyle(value === option.value)}>
        {option.label}
      </div>
    ));
  };

  return (
    <div ref={containerRef} css={containerStyle}>
      <button type="button" onClick={toggleDropdown} css={triggerButtonStyle}>
        {displayText}
      </button>

      {isOpen && (
        <div css={dropdownMenuStyle}>
          <div css={searchInputWrapperStyle}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => handleSearchChange(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              css={searchInputStyle}
            />
          </div>

          <div onClick={() => handleSelect('')} css={optionItemStyle(!value)}>
            {placeholder}
          </div>
          {renderOptions()}
        </div>
      )}
    </div>
  );
}

export default SelectBox;
