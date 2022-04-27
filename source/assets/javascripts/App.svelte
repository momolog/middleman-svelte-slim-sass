<script>
  import HelloSayer from 'HelloSayer.svelte'
  let name  = 'world'
  let name2 = ''
</script>

<style>
  input {
    width: 300px;
    display: block;
    margin: 1em 0;
  }
</style>

<h3>No arg</h3>
<HelloSayer />

<h3>With arg "world"</h3>
<HelloSayer {name} />

<h3>With variable arg</h3>
<input bind:value={name2} placeholder="enter your name to be greeted" />
<HelloSayer name={name2} />
