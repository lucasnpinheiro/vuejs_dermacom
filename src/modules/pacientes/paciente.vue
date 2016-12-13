<template>
  <div style="width:100%;">
    <my-table :titulo="'Pacientes'" :url="'pacientes'" :moduloEdit="'PacienteEdit'"></my-table>
  </div>
</template>

<script>

import MyTable from '../../helper/table.vue'

export default {
  components:{MyTable},
  data () {
    return {}
  }
}
</script>