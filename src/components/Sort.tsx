import React from 'react';

export type DropdownProperties = {
  name: string;
};


interface SortingOptions{
  options: DropdownProperties[];
  handleClick: ( event: React.ChangeEvent<HTMLSelectElement> ) => void;
}


const SortOptions = ( props: SortingOptions ) => {
  
  return (
      <select id="sorting"
              onChange={event => props.handleClick( event )}>
        {props.options.map( ( option, i ) => (
            <option key={i} value={option.name}>
              {option.name}
            </option>
        ) )}
      </select>
  );
};

export default SortOptions;
