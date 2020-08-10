import React from 'react'
import { Radios } from 'nes-react'

interface FilterRadioProps {
  selectedValue: string;
  onValueChange(selectedValue: string) : void;
}

const FilterRadio: React.FC<FilterRadioProps> = (props) => {
  return (
    <Radios
      options={[
        {value: 'yes', label: 'Yes'},
        {value: 'no', label: 'No'}
      ]}
      selectedValue={props.selectedValue}
      onValueChange={props.onValueChange}
    />
  )
}

export default FilterRadio
