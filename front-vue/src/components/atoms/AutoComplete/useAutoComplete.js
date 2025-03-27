// useAutoComplete.ts
import { ref, computed, watch } from 'vue'
import { getValue } from '../../../utils/utils'

export function useAutoComplete(props) {
  const query = ref(props.modelValue || '')
  const selectedOption = ref(null)

  const filtering = (data, filterBy, value) => {
    return data.filter((el) => {
      return getValue(el, filterBy).includes(value);
    });
  }

  const filteredOptions = computed(() => 
    query.value === ""
      ? props.list
      : filtering(props.list, props.filterField || "name", query.value)
  )

  watch(() => props.modelValue, (newVal) => {
    if (newVal) {
      selectedOption.value = props.list.find((item) => item.id === newVal) || null
    }
  }, { immediate: true })

  watch(selectedOption, (newSelectedOption) => {
    query.value = getValue(newSelectedOption, props.fieldDisplay || "name") || ''
  })

  const changeHandler = (value) => {
    selectedOption.value = value
  }

  return {
    query,
    selectedOption,
    filteredOptions,
    changeHandler
  }
}