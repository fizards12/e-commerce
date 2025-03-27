<template>
    <router-link 
      :class="linkClasses" 
      v-bind="$attrs"
    >
      <slot />
    </router-link>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { tv } from 'tailwind-variants';
  
  const buttonVariant = tv({
    base: "no-underline rounded-lg w-full justify-start btn",
    variants: {
      variant: {
        ghost: "btn-ghost",
        solid: "",
        outline: "btn-outline",
        link: "", // Add link variant but leave it empty as it won't be used
      },
      color: {
        primary: "btn-primary",
        secondary: "btn-secondary",
        accent: "btn-accent",
        info: "btn-info",
        success: "btn-success",
        warning: "btn-warning",
        error: "btn-error",
      },
      size: {
        xs: "btn-xs",
        sm: "btn-sm",
        md: "btn-md",
        lg: "btn-lg",
      }
    },
    defaultVariants: {
      variant: "ghost",
      size: "sm",
      color: "primary"
    }
  });
  
  const linkVariant = tv({
    base: "rounded-lg w-full justify-start link link-hover",
    variants: {
      color: {
        primary: "link-primary",
        secondary: "link-secondary",
        accent: "link-accent",
        info: "link-info",
        success: "link-success",
        warning: "link-warning",
        error: "link-error",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      }
    },
    defaultVariants: {
      size: "sm",
      color: "primary"
    }
  });
  
  const variantFactory = (variant) => {
    return variant === 'link' ? linkVariant : buttonVariant;
  };
  
  const getActiveStyle = (variant) => {
    return variant === 'link' ? 'font-bold underline' : 'btn-active font-bold';
  };
  
  export default {
    name: 'NavbarLink',
    inheritAttrs: false,
    props: {
      variant: {
        type: String,
        default: 'ghost',
        validator: (value) => ['link', 'ghost', 'solid', 'outline'].includes(value)
      },
      color: {
        type: String,
        default: null,
        validator: (value) => [
          'primary', 'secondary', 'accent', 'info', 
          'success', 'warning', 'error', null
        ].includes(value)
      },
      size: {
        type: String,
        default: null,
        validator: (value) => ['xs', 'sm', 'md', 'lg', null].includes(value)
      },
      className: {
        type: [String, Function],
        default: ''
      }
    },
    setup(props, { attrs }) {
      const linkClasses = computed(() => {
        // Determine the base classes
        const variantStyle = variantFactory(props.variant);
        
        // Get the variant-specific classes
        const baseClasses = variantStyle({ 
          variant: props.variant, 
          color: props.color, 
          size: props.size 
        });
  
        // Combine with passed className
        const passedClasses = typeof props.className === 'function' 
          ? props.className(attrs) 
          : props.className;
  
        // Check for active state (Vue Router equivalent)
        const isActive = attrs.to && attrs.to === attrs.to;
        const activeStyle = isActive ? getActiveStyle(props.variant) : '';
  
        return `${passedClasses} ${baseClasses} ${activeStyle}`.trim();
      });
  
      return {
        linkClasses
      };
    }
  };
  </script>