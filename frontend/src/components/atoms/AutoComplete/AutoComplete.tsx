import { Key, useState } from "react";
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
}

function filtering<T>(data: T[], filterBy: string, value: string) {
  return data.filter((el) => {
    return getValue(el, filterBy).includes(value);
  });
}

const AutoComplete: React.FC<
  ComboboxProps<Option, boolean> & AutoCompleteProps
> = ({ options, fieldDisplay, onChange,name, ...props }) => {
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
              onChange={(event) => setQuery(event.target.value)}
              className=""
            />
            <span>{open ? <BiUpArrow /> : <BiDownArrow />}</span>
          </ComboboxButton>
          <ComboboxOptions
            className={"absolute z-10 top-full left-0 mt-2 w-full"}
          >
            {filteredOptions.map((option) => (
              <ComboboxOption
                key={typeof option === "string" ? option : (option.id as Key)}
                value={option}
              >
                {({ focus }) => (
                  <div
                    className={`${
                      focus ? "bg-blue-500 text-white" : "bg-white text-black"
                    } p-2`}
                  >
                    {getValue(option, fieldDisplay || "name")}
                  </div>
                )}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </>
      )}
    </Combobox>
  );
};

export default AutoComplete;
