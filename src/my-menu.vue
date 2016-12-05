<template>
  <div>
    <ul class="menu clearfix">
      <li><router-link :to="{name: 'Dashboard'}">DASHBOARD</router-link></li>
      <li><router-link :to="{name: 'Lesão'}">Lesões</router-link></li>
      <li><router-link :to="{name: 'Paciente'}">Pacientes</router-link></li>
    </ul>
</div>
</template>

<script>
export default {

}
</script>
