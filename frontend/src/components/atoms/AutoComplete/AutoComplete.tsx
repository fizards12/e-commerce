import { Key } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  ComboboxProps,
} from "@headlessui/react";
import { getValue } from "../../../utils/utils";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import { useAutoComplete } from "./useAutoComplete";

export interface Option {
  id?: string;
  name?: string;
}
export interface AutoCompleteProps<T = Option> {
  list: T[];
  fieldDisplay?: string;
  filterField?: string;
  name?: string;
  val?:string;
  id?: string;
}
const AutoComplete: React.FC<
  ComboboxProps<Option, boolean> & AutoCompleteProps
> = ({ list, fieldDisplay, onChange,name,val, id,...props }) => {
  const {filteredOptions,changeHandler, setQuery, selectedOption} = useAutoComplete({ list, fieldDisplay, onChange,name,val, id,...props })
  
  const optionsList = filteredOptions.map((option) => (
    <ComboboxOption
    className={"cursor-pointer"}
      key={typeof option === "string" ? option : (option.id as Key)}
      value={option}
    >
      {({ selected }) => (
        <div
          className={`transition-colors duration-150 text-black hover:bg-base-300 ${
            selected ? "bg-primary! text-white!" : ""
          }
           p-2`}
        >
          <span>{getValue(option, fieldDisplay || "name")}</span>
        </div>
      )}
    </ComboboxOption>
  ))
  return (
    <Combobox
      as={"div"}
      className={"w-full relative"}
      name={name}
      value={selectedOption}
      onChange={changeHandler}
    >
      {({ open }) => (
        <>
          <ComboboxButton
            className={
              "input input-bordered input-sm rounded-lg flex items-center justify-between w-full"
            }
          >
            <ComboboxInput
              displayValue={(selectedOption) => getValue(selectedOption, fieldDisplay || "name")}
              onChange={(event) => setQuery(event.target.value)}
              className=""
              id={id}
            />
            <span>{open ? <BiUpArrow /> : <BiDownArrow />}</span>
          </ComboboxButton>
          <ComboboxOptions
            className={"absolute z-10 top-full left-0 mt-2 w-full shadow-lg rounded-box overflow-y-auto bg-base-200"}
          >
            
            {optionsList.length > 0 && optionsList.map((option) => option)}
            {optionsList.length === 0 && <div className="p-2">No results</div>}
          </ComboboxOptions>
        </>
      )}
    </Combobox>
  );
};

export default AutoComplete;
