<template>
  <div v-show="visivel" class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Aviso!</p>
      </header>
      <section class="modal-card-body">{{msg}}</section>
      <footer class="modal-card-foot">
        <a class="button is-primary ok" v-on:click="close()">OK</a>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    active: false,
    msg: '',
    exec: null
  },
  data () {
    return {
      visivel: false
    }
  },
  mounted() {
    this.close();
    if(this.active){
      this.open();
    }
  },
  methods: {
    open () {
      this.visivel = true;
    },
    close () {
      this.visivel = false;
    }
  }
}
</script>
