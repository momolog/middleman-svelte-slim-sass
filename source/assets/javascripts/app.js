import App from './App.svelte'

document.addEventListener("DOMContentLoaded",function(){
  const app = new App({
    target: document.getElementById('svelte-component'),
    props:  {}
  });
});
