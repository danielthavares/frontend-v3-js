<script setup>
import VPagination from "./VPagination.vue";
defineProps({
  caption: { type: String, default: null },
  /**
   * Example:
   * columns: [{ field: "id", header: "ID", size:2 }, { field: "first", header: "First", size:2 }]
   */
  columns: { type: Array, default: () => [], required: true },
  /**
   * Example:
   * values: [{ id: 1, first: "First 1", last: "last 1", handle: "handle 1" }, { id: 2, first: "First 2", last: "last 2", handle: "handle 2" }]
   */
  values: { type: Array, default: () => [], required: true },
  /**
   * Example:
   * actions: [{icon: "edit", click: fnEdit, label: "Editar"},]
   */
  actions: { type: Array, default: () => [], required: true },
  /**
   * Estrutura do objeto:
   * pagination["previousPage"] = previousPage;
   * pagination["nextPage"] = nextPage;
   * pagination["pageNumber"] = pageNumber;
   * pagination["totalPages"] = totalPages;
   */
  pagination: {
    type: Object,
    default: null,
  },
});
defineEmits(["click-pagination"]);
</script>
<template>
  <div v-if="values.length > 0" class="table-responsive">
    <table class="table table-bordered">
      <thead class="table-primary">
        <tr>
          <th
            v-for="(col, index) in columns"
            :key="index"
            scope="col"
            :class="col.size ? `col-${col.size}` : 'col'"
          >
            {{ col.header }}
          </th>
          <th v-if="actions.length > 0" class="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, index) in values" :key="index">
          <td v-for="(col, index1) in columns" :key="index1">
            {{ value[col.field] }}
          </td>
          <td v-if="actions.length > 0">
            <div>
              <a
                v-for="(action, index2) in actions"
                :key="index2"
                class="link-primary m-1"
                role="button"
                :title="action.label"
                @click="action.click(value)"
              >
                <em v-if="action.icon" :class="action.icon"></em>
                <span v-else>{{ action.label }}</span></a
              >
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <v-pagination
      v-if="pagination"
      v-bind="pagination"
      @click-pagination="$emit('click-pagination', $event)"
    />
  </div>
</template>
