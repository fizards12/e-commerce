<template>
    <div :class="`form-control ${classes.wrapperClass || ''}`">
      <label 
        :for="id" 
        :class="`label ${classes.labelClass || ''}`"
      >
        <span class="label-text">{{ label }}</span>
      </label>
      
      <component
        :is="getComponentType"
        :id="id"
        :name="name"
        :type="inputType"
        v-bind="$attrs"
        :class="variantClasses"
      />
      
      <span 
        v-if="error && touched" 
        :class="`text-xs text-error ${classes.errorClass}`"
      >
        {{ error }}
      </span>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { inputVariants } from './variants';
  
  const inputAsArr = [
    'input', 'select', 'textarea', 'checkbox', 'radio', 'button'
  ];
  
  export default {
    name: 'Field',
    props: {
      name: {
        type: String,
        required: true
      },
      as: {
        type: String,
        default: 'input',
        validator: (value) => inputAsArr.includes(value)
      },
      error: String,
      touched: Boolean,
      label: String,
      size: {
        type: String,
        default: 'md',
        validator: (value) => ['lg', 'md', 'sm'].includes(value)
      },
      id: String,
      classes: {
        type: Object,
        default: () => ({
          wrapperClass: '',
          fieldClass: '',
          labelClass: '',
          errorClass: ''
        })
      }
    },
    setup(props) {
      const fieldVariants = inputVariants(props.as);
  
      const variantClasses = computed(() => {
        const classes = fieldVariants({
          size: props.size,
          error: !!props.error && props.touched,
          touched: props.touched
        });
        return `${classes} ${props.classes.fieldClass || ''}`;
      });
  
      const inputType = computed(() => {
        return props.as === 'checkbox' || props.as === 'radio' 
          ? props.as 
          : props.type;
      });
  
      const getComponentType = computed(() => {
        if (props.as === 'checkbox' || props.as === 'radio') {
          return 'input';
        }
        return props.as;
      });
  
      return {
        variantClasses,
        inputType,
        getComponentType
      };
    }
  };
  </script>