<script>
  import { createEventDispatcher } from 'svelte'
  export let title
  export let status
  export let mode

  let dispatch = createEventDispatcher()
</script>

<p on:click>{title}: <span class={mode}>{status}</span></p>

<style>
  p {
    text-align: justify;
  }
</style>