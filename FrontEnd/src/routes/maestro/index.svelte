<script>
        import { usuario } from "../../stores/usuario.js";
        import { maestro } from "../../stores/maestro.js";
        import { onMount } from "svelte";
        import { get } from "svelte/store";
        import * as sapper from '@sapper/app';
    
        let nombre;
        let reportes;
        let Bienvenido;
        let reporteSemanal = false;
        let reporteMaestro = false;
        let aseo = false;

        const getFromLocalStorage = ({clase, id, name, title, type}) => {
            clase = clase ? clase : localStorage.getItem('clase');
            id = id ? id : localStorage.getItem('id');
            name = name ? name : localStorage.getItem('name');
            title = title ? title : localStorage.getItem('title');
            type = type ? type : localStorage.getItem('type');
            return {clase, id, name, title, type};
        };
    
        onMount(() => {
            let value = get(usuario);
            value = getFromLocalStorage(value);

            nombre = value.title + ' ' + value.name;

            const act = get(maestro);
            console.log(act)
            reportes = act;

            reporteSemanal = reportes.reporteSemanal;
            reporteMaestro = reportes.reporteDelMaestro;
            aseo = reportes.aseo;

            if(value.title == 'Hna.') {
                Bienvenido = 'Bienvenida';
            } else {
                Bienvenido = 'Bienvenido';
            }
        });
    
        function handleReporteSemanal() {
            sapper.goto('reporteSemanal');
        }
    
        function handleReporteMaestro() {
            sapper.goto('reporteMaestro');
        }

        function handleAseo() {
            sapper.goto('aseo');
        }


    </script>
    
    <style>

        :global(html) {
            height: 100%;
            background-image: url("https://firebasestorage.googleapis.com/v0/b/cemf-registro.appspot.com/o/background.jpg?alt=media&token=d6997719-c543-47e1-b4ca-b2addbc4f526");
            background-size: cover;
        }

        :global(body) {
            /* this will apply to <body> */
            /* your styles go here */
            
            height:100%;
        }

        div {
            color: whitesmoke;
            background-color: transparent;
        }

        h3 {
            color: whitesmoke;
        }

        .completed {
            background-color: #00ff00;
        }

    </style>
    
    <div class="container has-text-centered">
      <div class="notification">
          <h1 class="title">{Bienvenido}</h1>
          <h2 class="title is-2">{nombre}</h2>
      </div>
      <div class="columns">
        <div class="column">
            <h3 class="title is-3">
                Reporte Semanal
            </h3>
          <button class="button is-large is-rounded" disabled={reporteSemanal} class:completed="{reporteSemanal}" on:click={handleReporteSemanal}>
              <span>
                  <i class="far fa-file-alt"></i>
              </span>
          </button>
        </div>
        <div class="column">
            <h3 class="title is-3">
                Reporte del Maestro
            </h3>
            <button class="button is-large is-rounded" disabled={reporteMaestro} class:completed="{reporteMaestro}" on:click={handleReporteMaestro}>
                    <span>
                        <i class="fas fa-chalkboard-teacher"></i>
                    </span>
            </button>
        </div>
        <div class="column">
            <h3 class="title is-3">
                Aseo
            </h3>
            <button class="button is-large is-rounded" disabled={aseo} class:completed="{aseo}" on:click={handleAseo}>
                    <span>
                        <i class="fas fa-broom"></i>
                    </span>
                </button>
        </div>
        <div class="column">
            <h3 class="title is-3">
                Ranking
            </h3>
            <button class="button is-large is-rounded">
                    <span>
                        <i class="fas fa-award"></i>
                    </span>
                </button>
        </div>
      </div>
    </div>
    