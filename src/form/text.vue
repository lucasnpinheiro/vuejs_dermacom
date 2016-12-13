<template>
    <div>
        <label class="label">{{label}}</label>
        <p class="control">
            <input class="input" type="text">
        </p>
    </div>
</template>

<script>
export default {
  props: {
      label : ''
  },
  data () {
    return {}
  }
}
</script>