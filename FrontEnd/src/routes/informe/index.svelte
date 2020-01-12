<script>
    import { onMount } from "svelte";
    import Calculo from './components/calculosDelDia.svelte';
    import Tabla from './components/tablaClases.svelte';

    let local = 'http://localhost:5000';
    let local2 = 'http://192.168.0.131:8080';
    let live = 'https://us-central1-cemf-registro.cloudfunctions.net';


    let urlOfrenda = local2 + '/api/ofrenda';
    let urlAseo = local2 + '/api/aseo';

    let dataOfrenda;
    let dataAseo;


    onMount(() => {
        fetch(urlOfrenda).then(Response => {
            if(Response.ok) {
                return Response.json();
            }
            }).then(data => {
                console.log("OFRENDA: ", data);
                dataOfrenda = data;
            })

        fetch(urlAseo).then(Response => {
            if(Response.ok) {
                return Response.json();
            }
        }).then(data => {
            console.log("ASEO: ", data);
            dataAseo = data;
        })
    })

</script>

<style>
    .container {
        background-color: white;
    }
</style>


<div class="container">
        <div class="columns">
                <div class="column">
                    {#if dataOfrenda && dataAseo}
                    <Calculo dataOfrenda={dataOfrenda} dataAseo={dataAseo}/>
                    {/if}
                </div>
                <div class="column">
                    {#if dataOfrenda && dataAseo}
                    <Tabla dataOfrenda={dataOfrenda} dataAseo={dataAseo}/>
                    {/if}
                </div>
                <div class="column">
                    
                </div>
            </div>
</div>

