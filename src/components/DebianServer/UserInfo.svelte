<script>
  import {createEventDispatcher} from 'svelte'
  import {users} from './users-store'
  export let root
  // export let dispModal = false
  const dispatch = createEventDispatcher()

  function displayModal() {
    dispatch('displaymodal')
  }

</script>


{#if root}
  <p on:click={displayModal}>see user info</p>
  <p>add user</p>
  <p>update user</p>
  <p>delete user</p>
{:else}
    <p on:click={displayModal}>see user info</p>
{/if}

<style>

</style>

