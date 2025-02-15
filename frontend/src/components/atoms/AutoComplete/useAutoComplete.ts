import { useEffect, useState } from "react";
import { getValue } from "../../../utils/utils";
import { AutoCompleteProps, Option } from "./AutoComplete";
import { ComboboxProps } from "@headlessui/react";

function filtering<T>(data: T[], filterBy: string, value: string) {
    return data.filter((el) => {
        return getValue(el, filterBy).includes(value);
    });
}
export const useAutoComplete = (props: AutoCompleteProps & ComboboxProps<Option, boolean>) => {
    const [query, setQuery] = useState(props.val || '');
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const changeHandler = (value: NoInfer<Option>) => {
        if (props.onChange) {
            props.onChange(value);
        }
        setSelectedOption(value);
    }
    const filteredOptions =
        query === ""
            ? props.list
            : filtering(props.list, props.filterField || "name", query);
    useEffect(() => {
        if(props.val){
            setSelectedOption((props.list.find((item)=>item.id === props.val) as Option) || null);
        }
    }, [props.val])
    useEffect(() => {
        setQuery(getValue(selectedOption, props.fieldDisplay || "name") || '');
    }, [selectedOption, props.fieldDisplay])


    return {
        query,
        setQuery,
        selectedOption,
        setSelectedOption,
        changeHandler,
        filteredOptions
    }
}