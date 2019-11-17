<script>
    import { usuario } from "../../stores/usuario.js";
    import { maestro } from "../../stores/maestro.js";
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import * as sapper from '@sapper/app';
    import Swal from 'sweetalert2';


    let maestroID;
    let clase;
    let asistencia;
    let expositores;
    let capitulos;
    let biblias;
    let ofrenda;
    let visitantes;

    let loading = false;

    onMount(() => {
        const value = get(usuario);
        maestroID = value.id;
        clase = value.clase;
    })

    function handleClick() {

        let fechaFormateada = new Date().toISOString();
        loading = true;
        let data = {
            id: maestroID,
            asistencia: asistencia || 0,
            biblias: biblias || 0,
            expositores: expositores || 0,
            clase: clase,
            capitulos: capitulos || 0,
            fecha: fechaFormateada,
            ofrenda: ofrenda || 0,
            visitantes: visitantes || 0
        }

        let url = 'http://localhost:5000/api/reporteSemanal';

        fetch(url, {
            method: 'post',
            body: JSON.stringify({id: data.id, asistencia: data.asistencia, biblias: data.biblias, clase: data.clase, capitulos: data.capitulos, fecha: data.fecha, ofrenda: data.ofrenda, visitantes: data.visitantes, expositores: data.expositores}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(Content => {
            if(Content.ok) {

                Swal.fire('¡Exito!', 'El reporte se guardo exitosamente', 'success');

                maestro.update(reporte => {
                    reporte.reporteSemanal = true;
                    return reporte;
                })
                sapper.goto('maestro');
            } else {
                alert('No se mando el reporte');
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
        <h1 class="title has-text-centered is-1">Reporte Semanal</h1>
        <div class="columns">
                <div class="column">
                        <div class="field">
                                <label class="label">Asistencia</label>
                                <div class="control">
                                  <input class="input" type="number" placeholder="Asistencia" bind:value={asistencia}>
                                </div>
                                <p class="help">Asistencia de la Clase</p>
                        </div>
                        <div class="field">
                                <label class="label">Capitulos Leidos</label>
                                <div class="control">
                                  <input class="input" type="number" placeholder="Capitulos Leidos" bind:value={capitulos}>
                                </div>
                                <p class="help">Cantidad de capitulos que leyó la Clase</p>
                        </div>
                </div>
                <div class="column">
                        <div class="field">
                                <label class="label">Biblias</label>
                                <div class="control">
                                  <input class="input" type="number" placeholder="Biblias" bind:value={biblias}>
                                </div>
                                <p class="help">Número de Biblias</p>
                        </div>
                        <div class="field">
                                <label class="label">Ofrenda</label>
                                <div class="control">
                                  <input class="input" type="number" placeholder="Ofrenda" bind:value={ofrenda}>
                                </div>
                                <p class="help">Cantidad de Ofrenda</p>
                        </div>
                </div>
                <div class="column">
                        <div class="field">
                                <label class="label">Visitantes</label>
                                <div class="control">
                                  <input class="input" type="number" placeholder="Visitantes" bind:value={visitantes}>
                                </div>
                                <p class="help">Cantidad de Visitantes</p>
                        </div>
                        <div class="field">
                            <label class="label">Expositores</label>
                            <div class="control">
                              <input class="input" type="number" placeholder="Expositores" bind:value={expositores}>
                            </div>
                            <p class="help">Cantidad de Expositores</p>
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

