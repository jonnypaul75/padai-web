
import Select, { type StylesConfig } from 'react-select';
import type { SelectOption } from '../../types/common';

interface SelectBoardProps {
   value: string | null;
  onSelectBoard: (board: string) => void;
}

const boardOptions: SelectOption[] = [
  { value: 'CBSE', label: 'CBSE' },
  { value: 'ICSE', label: 'ICSE' },
  { value: 'NCERT', label: 'NCERT' },
];

const customStyles: StylesConfig<SelectOption, false> = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#f97316' : provided.backgroundColor, // Gold on hover/focus
    color: state.isFocused ? '#fff' : provided.color,                        // Text white on hover/focus
    cursor: 'pointer',
  }),
};

const SelectBoard = ({ value, onSelectBoard }: SelectBoardProps) => {
  const handleBoardChange = (option: SelectOption | null) => {
    if (option) {
      onSelectBoard(option.value);
    }
  };
  const selectedOption = boardOptions.find(opt => opt.value === value) || null;
  return (
    <div>
      <Select
        styles={customStyles}
        options={boardOptions}
        onChange={handleBoardChange}
        value={selectedOption}
        placeholder="Select Board"
        className="filter-select"
      />
    </div>
  );
};

export default SelectBoard;
