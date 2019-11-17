<script>
    import { usuario } from "../../stores/usuario.js";
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import * as sapper from '@sapper/app';
    import Swal from 'sweetalert2';

    let loading = false;
    let id;
    let nombre;
    let clase;
    let capitulos;
    let visito;
    let asistenciaServicio = [];
    let martes;
    let martesVal = 'Martes';
    let jueves;
    let juevesVal = 'Jueves';
    let sabado;
    let sabadoVal = 'Sabado';
    let domingo;
    let domingoVal = 'Domingo';

    onMount(() => {
        const value = get(usuario);
        console.log("Value", value)
        id = value.id;
        nombre = value.name;
        clase = value.clase;
    })

    function handleClick() {
        loading = true;

        let fechaFormateada = new Date().toISOString();

        let url = 'http://localhost:5000/api/reporteMaestro';

        if(martes) {
            asistenciaServicio = [...asistenciaServicio, martesVal];
        }

        if(jueves) {
            asistenciaServicio = [...asistenciaServicio, juevesVal];
        }

        if(sabado) {
            asistenciaServicio = [...asistenciaServicio, sabadoVal];
        }

        if(domingo) {
            asistenciaServicio = [...asistenciaServicio, domingoVal];
        }

        let data = {
            id: id,
            clase: clase,
            fecha: fechaFormateada,
            capitulos: capitulos || 0,
            visita: visito,
            nombre: nombre,
            asistencia: asistenciaServicio
        }

        fetch(url, {
            method: 'post',
            body: JSON.stringify({id: data.id, clase: data.clase, capitulos: data.capitulos, visita: data.visita, asistencia: data.asistencia, fecha: data.fecha, nombre: data.nombre}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(Response => {
            if(Response.ok){
                Swal.fire('¡Exito!', 'El reporte se guardo exitosamente', 'success');

                sapper.goto('directiva');
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
            <a class="button is-large is-rounded is-loading">Loading</a>
        </div>
</div>
{:else}
<div class="container">
    <h1 class="title has-text-centered is-1">Reporte de la Directiva</h1>
    <div class="columns">
        <div class="column">
                <div class="field">
                        <label class="label">Capitulos Leídos</label>
                        <div class="control">
                          <input class="input" type="number" placeholder="Capitulos" bind:value={capitulos}>
                        </div>
                        <p class="help">Los capitulos que leiste en la semana</p>
                </div>
        </div>
        <div class="column">
                <div class="field">
                        <label class="label">¿Visitó?</label>
                        <div class="select is-rounded">
                          <select bind:value={visito}>
                              <option disabled value="" selected>Selecciona una opción</option>
                              <option value="true">Si</option>
                              <option value="false">No</option>
                          </select>
                        </div>
                        <p class="help">Visita a algún miembro de la Iglesia</p>
                </div>
        </div>
        <div class="column">
                <div class="field">
                        <label class="label">Asistencia a Cultos</label>
                        <label class="checkbox">
                          <input type="checkbox" bind:checked={martes}>
                          Martes
                        </label>
                        <label class="checkbox">
                            <input type="checkbox" bind:checked={jueves}>
                            Jueves
                        </label>
                        <label class="checkbox">
                            <input type="checkbox" bind:checked={sabado}>
                            Sabado
                        </label>
                        <label class="checkbox">
                            <input type="checkbox" bind:checked={domingo}>
                            Domingo
                        </label>
                        <p class="help">Cultos que asististe en la semana</p>
                </div>
        </div>
    </div>

    <div class="field is-grouped is-grouped-centered">
            <p class="control">
                <button class="button is-primary" on:click={handleClick}>
                    Enviar Reporte del Maestro
                </button>
            </p>
        </div>  

</div>
{/if}