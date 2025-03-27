<!-- AutoComplete.vue -->

<template>
  <Combobox
    v-model="selectedOption"
    as="div"
    class="w-full relative"
    :name="name"
    @update:modelValue="handleChange"
  >
    <template #default="{ open }">
      <ComboboxButton
        class="input input-bordered input-sm rounded-lg flex items-center justify-between w-full"
      >
        <ComboboxInput
          :displayValue="
            (selectedOption) => getValue(selectedOption, fieldDisplay || 'name')
          "
          @change="query = $event.target.value"
          :id="id"
        />
        <span>
          <ChevronUpIcon v-if="open" />
          <ChevronDownIcon v-else />
        </span>
      </ComboboxButton>

      <ComboboxOptions
        class="absolute z-10 top-full left-0 mt-2 w-full shadow-lg rounded-box overflow-y-auto bg-base-200"
      >
        <template v-if="filteredOptions.length > 0">
          <ComboboxOption
            v-for="option in filteredOptions"
            :key="option.id"
            :value="option"
            class="cursor-pointer"
          >
            <template #default="{ selected }">
              <div
                :class="`transition-colors duration-150 text-black hover:bg-base-300 ${
                  selected ? 'bg-primary! text-white!' : ''
                } p-2`"
              >
                <span>{{ getValue(option, fieldDisplay || "name") }}</span>
              </div>
            </template>
          </ComboboxOption>
        </template>
        <div v-else class="p-2">No results</div>
      </ComboboxOptions>
    </template>
  </Combobox>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/vue";
import { ChevronUpIcon, ChevronDownIcon } from "lucide-vue-next";
import { getValue } from "../../../utils/utils";
import { useAutoComplete } from "./useAutoComplete";
const props = withDefaults(defineProps(), {
  fieldDisplay: "name",
  filterField: "name",
  modelValue: "",
});

const emit = defineEmits(["update:modelValue"]);

const { query, selectedOption, filteredOptions, changeHandler } =
  useAutoComplete(props);

const handleChange = (value) => {
  changeHandler(value);
  emit("update:modelValue", value?.id);
};
</script>


<style scoped>
</style>
