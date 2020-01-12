<script>
    let clase;
    let title;
    let username = '';
    let name = '';
    let password = '';
    let loading = false;

    function handleClick() {
        loading = true
        let fechaFormateada = new Date().toISOString();

        let data = {
            username: username,
            password: password,
            name: name, 
            title: title,
            type: 'Maestro',
            clase: clase
        }

        let url = 'http://192.168.50.205:5000/api/createMaestro';

        fetch(url, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(Content => {
            if(Content.ok) {

                Swal.fire('¡Exito!', 'El maestro se creo exitosamente', 'success');
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
        <a href="." class="button is-large is-rounded is-loading">Loading</a>
    </div>
</div>   
{:else}
<div class="container">
    <h1 class="title has-text-centered is-1">Registro de Maestro</h1>
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
    <hr>
    <div class="columns">
        <div class="column">
            <div class="field">
                <label class="label">Nombre del Maestro</label>
                <div class="control">
                        <input class="input" type="text" placeholder="Nombre del Maestro" bind:value={name}>
                </div>
                <p class="help">Escribe el nombre del maestro a registrar</p>
            </div>
        </div>
        <div class="column">
            <label class="label">Usuario</label>
            <div class="control">
                    <input class="input" type="text" placeholder="Usuario del Maestro" bind:value={username}>
            </div>
            <p class="help">Escribe el usuario que tendra el maestro</p>
        </div>
        <div class="column">
            <label class="label">Contraseña</label>
            <div class="control">
                <input type="text" class="input" placeholder="Contraseña del Maestro" bind:value={password}>
            </div>
            <p class="help">Escribe la contraseña del usuario</p>
        </div>
        <div class="column">
            <div class="field">
                <label class="label">Selecciona el titulo del maestro</label>
                <div class="select">
                    <select bind:value={title}>
                        <option disabled selected>Titulo del Maestro</option>
                        <option value="Hno.">Hermano</option>
                        <option value="Hna.">Hermana</option>
                    </select>
                </div>
            </div>
        </div>
    </div>


    <div class="field is-grouped is-grouped-centered">
        <p class="control">
            <button class="button is-primary" on:click={handleClick}>
                Registrar Maestro
            </button>
        </p>
    </div>  
</div>
{/if}   