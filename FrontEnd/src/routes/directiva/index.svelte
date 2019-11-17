<script>
    import { usuario } from "../../stores/usuario.js";
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import { fade } from "svelte/transition";
    import * as sapper from '@sapper/app';

    let Bienvenido;
    let nombre;

    onMount(() => {
        const value = get(usuario);
        console.log(value);
        nombre = value.title + ' ' + value.name;
        if(value.title === 'Hna.') {
            Bienvenido = 'Bienvenida';
        } else {
            Bienvenido = 'Bienvenido';
        }
    });

    function handleTesoreria() {

    }

    function handleRegistro() {
      sapper.goto('registroSalon');
    }

    function handleReporte() {
      sapper.goto('reporteDirectiva');
    }

    function handleInforme() {
      sapper.goto('informe');
    }

    function handleRanking() {
      sapper.goto('ranking');
    }

    function handleAseo() {
      sapper.goto('aseo');
    }

</script>

<style>

:global(html) {
            height: 100%;
        }

        :global(body) {
            /* this will apply to <body> */
            /* your styles go here */
            background-image: url("https://firebasestorage.googleapis.com/v0/b/cemf-registro.appspot.com/o/background.jpg?alt=media&token=d6997719-c543-47e1-b4ca-b2addbc4f526");
            height: 100%;
        }

        div {
            color: whitesmoke;
            background-color: transparent;
        }

        h3 {
            color: whitesmoke;
        }
</style>

<div transition:fade class="container has-text-centered">
  <div class="notification">
      <h1 class="title">{Bienvenido}</h1>
      <h2 class="title is-2">{nombre}</h2>
  </div>
  <div class="columns">
      <div class="column">
          <h3 class="title is-3">
            Reporte
          </h3>
          <button class="button is-large is-rounded" on:click={handleReporte}>
              <span>
                  <i class="fas fa-book-open"></i>
              </span>
          </button>
        </div>
    <div class="column">
        <h3 class="title is-3">
            Registro Salon
        </h3>
      <button class="button is-large is-rounded" on:click={handleRegistro}>
          <span>
              <i class="far fa-file-alt"></i>
          </span>
      </button>
    </div>
    <div class="column">
        <h3 class="title is-3">
          Aseo
        </h3>
        <button class="button is-large is-rounded" on:click={handleAseo}>
            <span>
                <i class="fas fa-broom"></i>
            </span>
        </button>
      </div>
  </div>
  <div class="columns">
      <div class="column">
          <h3 class="title is-3">
            Tesoreria
          </h3>
          <button class="button is-large is-rounded" on:click={handleTesoreria}>
              <span>
                  <i class="fas fa-money-check-alt"></i>
              </span>
          </button>
        </div>
        <div class="column">
          <h3 class="title is-3">
            Informe
          </h3>
          <button class="button is-large is-rounded" on:click={handleInforme}>
              <span>
                  <i class="far fa-list-alt"></i>
              </span>
          </button>
        </div>
        <div class="column">
          <h3 class="title is-3">
            Ranking
          </h3>
          <button class="button is-large is-rounded" on:click={handleRanking}>
              <span>
                  <i class="fas fa-award"></i>
              </span>
          </button>
        </div>
  </div>
</div>
