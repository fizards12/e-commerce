import { Key, useEffect, useState } from "react";
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

export interface Option {
  [key: string]: unknown;
}
interface AutoCompleteProps<T = Option> {
  options: T[];
  fieldDisplay?: string;
  filterField?: string;
  name?: string;
  id?: string;
}

function filtering<T>(data: T[], filterBy: string, value: string) {
  return data.filter((el) => {
    return getValue(el, filterBy).includes(value);
  });
}

const AutoComplete: React.FC<
  ComboboxProps<Option, boolean> & AutoCompleteProps
> = ({ options, fieldDisplay, onChange,name, id,...props }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [query, setQuery] = useState("");
    const changeHandler = (value: NoInfer<Option>) => {
        if (onChange) {
            onChange(value);
        }
        setSelectedOption(value);

    }
  const filteredOptions =
    query === ""
      ? options
      : filtering(options, props.filterField || "name", query);
  const optionsList = filteredOptions.map((option) => (
    <ComboboxOption
    className={"cursor-pointer"}
      key={typeof option === "string" ? option : (option.id as Key)}
      value={option}
    >
      {({ selected }) => (
        <div
          className={`transition-colors duration-150 text-black hover:bg-base-300 ${
            selected ? "!bg-primary !text-white" : ""
          }
           p-2`}
        >
          <span>{getValue(option, fieldDisplay || "name")}</span>
        </div>
      )}
    </ComboboxOption>
  ))
  useEffect(()=>{
    setQuery(getValue(selectedOption, fieldDisplay || "name") || '');
  },[selectedOption,fieldDisplay])
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
