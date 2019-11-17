<script>
        import { usuario } from "../../stores/usuario.js";
        import { onMount } from "svelte";
        import { get } from "svelte/store";
        import * as sapper from '@sapper/app';
        import Swal from 'sweetalert2';
    
        let loading = false;
        let maestroID;
        let clase;
        let asistencia;
        let capitulos;
        let biblias;
        let ofrenda;
        let visitantes;
    
        onMount(() => {
            const value = get(usuario);
            maestroID = value.id;
        })
    
        function handleClick() {
    
            loading = true
            let fechaFormateada = new Date().toISOString();
    
            let data = {
                id: maestroID,
                asistencia: asistencia || 0,
                biblias: biblias || 0,
                clase: clase,
                capitulos: capitulos || 0,
                fecha: fechaFormateada,
                ofrenda: ofrenda || 0,
                visitantes: visitantes || 0
            }
    
            console.log(data);

            let url = 'http://192.168.50.205:5000/api/reporteSemanal';

        fetch(url, {
            method: 'post',
            body: JSON.stringify({id: data.id, asistencia: data.asistencia, biblias: data.biblias, clase: data.clase, capitulos: data.capitulos, fecha: data.fecha, ofrenda: data.ofrenda, visitantes: data.visitantes}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(Content => {
            if(Content.ok) {

                Swal.fire('¡Exito!', 'El reporte se guardo exitosamente', 'success');
                sapper.goto('directiva');
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
            <div class="select">
                    <select bind:value={clase}>
                      <option disabled selected>Selecciona la Clase</option>
                      <option value="Angelitos">Angelitos</option>
                      <option value="Estrellitas">Estrellitas</option>
                      <option value="Soldaditos">Soldaditos</option>
                      <option value="Amigos">Amigos</option>
                      <option value="Hijos del Rey">Hijos del Rey</option>
                      <option value="Siervos">Siervos</option>
                      <option value="Seguidores">Seguidores</option>
                      <option value="Jovenes">Jovenes</option>
                      <option value="Pre-Baustimal">Pre-Baustimal</option>
                      <option value="Post-Bautismal">Post-Bautismal</option>
                      <option value="Familia de la Fe">Familia de la Fe</option>
                      <option value="Adultos">Adultos</option>
                      <option value="Nuevos Creyentes">Nuevos Creyentes</option>
                      <option value="Lideres">Lideres</option>
                    </select>
                  </div>
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
    
    