<script>
  import { onMount } from "svelte";

  export let dataOfrenda;
  export let dataAseo;
  let ofrenda = Number(0); 
  let aseo = Number(0);
  $: ofrendaRestante = Number(ofrenda) + Number(aseo) - 250; 
  $: aseoAEntregar = Number(aseo) + (250 - Number(aseo));

  onMount(() => {
    getOfrenda(dataOfrenda);
    getAseo(dataAseo);
  })

  function getOfrenda(data) {


    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      console.log(element);
      ofrenda += Number(element.ofrenda.$numberDecimal);
      
    }

  }

  function getAseo(data) {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      console.log(element);
      aseo += Number(element.monto.$numberDecimal);
      
    }
  }

</script>

<style>
</style>

<nav class="panel has-text-centered">
        <p class="panel-heading">
          Calculos del Dia
        </p>
        <div class="panel-block">
          <h1 class="title">
            Ofrenda: ${ofrenda} Aseo: ${aseo}
          </h1>

        </div>
        <div class="panel-block">
            <h1 class="title">
                Ofrenda Restante: ${ofrendaRestante}
                Aseo a Entregar: ${aseoAEntregar}
              </h1>
        </div>
</nav>