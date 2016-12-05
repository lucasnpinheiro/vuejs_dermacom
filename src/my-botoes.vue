<template>
  <div>
    <button :disabled="!novo" @click="btnNovo()" class="button is-info is-small">
      <i aria-hidden="true" class="fa fa-plus-circle"></i>
    </button>
    <button :disabled="!editar" @click="btNovo()" class="button is-info is-small">
      <i aria-hidden="true" class="fa fa-pencil-square"></i>
    </button>
    <button :disabled="!salvar" class="button is-info is-small">
      <i aria-hidden="true" class="fa fa-floppy-o"></i>
    </button>
    <button :disabled="!excluir" class="button is-info is-small">
      <i aria-hidden="true" class="fa fa-times-circle"></i>
    </button>
    <button :disabled="!consultar" class="button is-info is-small">
      <i aria-hidden="true" class="fa fa-list"></i>
    </button>
    <button :disabled="!imprimir" class="button is-info is-small">
      <i aria-hidden="true" class="fa fa-print"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: ['novo', 'editar', 'salvar', 'excluir', 'consultar', 'imprimir'],
  methods: {
    btnNovo (button) {
      this.$emit('onBtNovo')
    }
  }
}
</script>
