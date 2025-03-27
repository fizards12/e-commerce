<template>
    <table class="table w-full" v-bind="$attrs">
      <thead>
        <tr>
          <th>#</th>
          <th 
            v-for="(column, index) in columns" 
            :key="index"
            v-bind="column.props"
          >
            {{ column.label || column.field }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex">
          <th>{{ rowIndex + 1 }}</th>
          <td 
            v-for="(column, colIndex) in columns" 
            :key="colIndex"
            v-bind="column.props"
          >
            <template v-if="column.render">
              {{ column.render(row) }}
            </template>
            <template v-else>
              {{ row[column.field] }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  export default {
    name: 'Table',
    props: {
      data: {
        type: Array,
        default: () => []
      },
      columns: {
        type: Array,
        required: true,
        validator: (value) => {
          return value.every(column => 
            typeof column.field === 'string' && 
            (column.label === undefined || typeof column.label === 'string') &&
            (column.props === undefined || typeof column.props === 'object') &&
            (column.render === undefined || typeof column.render === 'function')
          )
        }
      }
    }
  }
  </script>