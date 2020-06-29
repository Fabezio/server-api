<script>
  import Element from '../UI/CardElement.svelte'
  export let root
  export let user

  $: console.log(user, root)
</script>

{#if !user}
    <Element title='user' status='---' mode='off'/>
    <Element title='privileges' status='---' mode='off'/>
    
    <!-- <p>user: <span class="off">---</span></p>
    <p>privileges: <span class="off">---</span></p> -->
    
{:else if !root}
  <Element title='user' status={user} mode='off'/>
  <Element title='privileges' status='normal' mode='off'/>
    <!-- <p>user: <span class="off">{user}</span></p> -->
    <!-- <p>privileges: <span class="off">normal</span></p> -->
{:else if root && user}
    <Element title='user' status={user} mode='on'/>
    <Element title='privileges' status='root' mode='on'/>
    <!-- <p>user: <span class="on">{user} (admin)</span></p>
    <p>privileges: <span class="on">root</span></p> -->
    
{/if}
