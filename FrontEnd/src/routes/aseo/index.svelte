<script>
    import { usuario } from "../../stores/usuario.js";
    import { maestro } from "../../stores/maestro.js";
    import { URL } from "../../config.js";
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import * as sapper from '@sapper/app';
    import Swal from 'sweetalert2';

    let aseo;
    let nombre;
    let id;
    let clase;
    let loading = false;

    onMount(() => {
        const value = get(usuario);
        id = value.id;
        nombre = value.name;
        clase = value.clase;
    })

    function handleClick(){

        loading = true;

        let url = 'http://localhost:8080/api/postaseo';

        let fechaFormateada = new Date().toISOString();

        let data = {
            id: id,
            aseo: aseo || 0,
            nombre: nombre,
            fecha: fechaFormateada,
            clase: clase ||'Directiva'
        }

        console.log(data);

        fetch(url, {
            method: 'post',
            body: JSON.stringify({id: data.id, aseo: data.aseo, clase: data.clase, fecha: data.fecha, nombre: data.nombre}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(Response => {
            if(Response.ok){
                Swal.fire('¡Exito!', 'El reporte se guardo exitosamente', 'success');

                if(clase === 'Directiva') {
                    sapper.goto('directiva')
                } else {
                    maestro.update(reporte => {
                        reporte.aseo = true;
                        return reporte;
                    });
                    sapper.goto('maestro');
                }
            }
        })


    }
</script>

<style>
    .container {
        background-color: white;
    }
</style>

{#if loading}
<div class="field is-grouped is-grouped-centered">
        <div class="control">
            <a href="." class="button is-large is-rounded is-loading">Loading</a>
        </div>
</div>
{:else}
<div class="container">
    <h1 class="title has-text-centered is-title-1">
        Aseo
    </h1>
    <div class="columns">
        <div class="column">
                <div class="field">
                        <label class="label">Aseo</label>
                        <div class="control">
                          <input class="input" type="number" placeholder="Aseo" bind:value={aseo}>
                        </div>
                        <p class="help">Aseo de la Semana</p>
                </div>
        </div>
    </div>
    <div class="field is-grouped is-grouped-centered">
            <p class="control">
                <button class="button is-primary" on:click={handleClick}>
                    Enviar Reporte Semanal
                </button>
            </p>
        </div> 
</div>
{/if}