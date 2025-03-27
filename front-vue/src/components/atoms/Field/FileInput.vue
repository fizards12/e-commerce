<template>
    <div :class="`max-w-md mx-auto p-6 ${className}`">
      <div class="flex flex-col items-center gap-4">
        <label class="relative group cursor-pointer">
          <input
            ref="inputRef"
            type="file"
            class="hidden"
            accept="image/*"
            @change="onChange"
          />
  
          <div :class="`avatar relative ${!val && 'placeholder'} w-32 h-32`">
            <div :class="`w-full rounded-box ${!val && 'bg-base-300 border-2 border-neutral/10 border-dashed'}`">
              <template v-if="val">
                <div class="relative w-full h-full">
                  <img
                    :src="typeof val === 'string' ? val : URL.createObjectURL(val)"
                    alt="Preview"
                    class="w-full h-full object-cover"
                  />
                  <div class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-box">
                    <MdFileUpload class="w-8 h-8 text-white" />
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="flex flex-col items-center justify-center">
                  <MdFileUpload class="w-8 h-8" />
                  <span class="text-xs mt-2">
                    {{ label || 'Upload Photo' }}
                  </span>
                </div>
              </template>
            </div>
          </div>
  
          <button
            v-if="val"
            @click.prevent="handleRemoveImage"
            class="btn btn-error btn-circle btn-xs absolute -top-2 -right-2"
          >
            <MdClose class="w-3 h-3" />
          </button>
        </label>
  
        <div v-if="error" class="text-error text-sm text-center">{{ error }}</div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { MdFileUpload, MdClose } from 'react-icons/md';
  
  export default {
    name: 'ImageUploader',
    components: {
      MdFileUpload,
      MdClose
    },
    props: {
      label: String,
      name: {
        type: String,
        required: true
      },
      val: [File, String],
      error: String,
      touched: Boolean,
      setFieldValue: {
        type: Function,
        required: true
      },
      className: {
        type: String,
        default: ''
      }
    },
    setup(props) {
      const inputRef = ref(null);
  
      const handleRemoveImage = () => {
        props.setFieldValue(props.name, undefined);
        if (inputRef.value) {
          inputRef.value.value = '';
        }
      };
  
      const onChange = (event) => {
        if (event.target.files?.[0]) {
          props.setFieldValue(props.name, event.target.files[0]);
        }
      };
  
      return {
        inputRef,
        handleRemoveImage,
        onChange
      };
    }
  };
  </script>