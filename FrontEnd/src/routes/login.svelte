<script>
    import { usuario } from "../stores/usuario.js";
    import { fade } from "svelte/transition";
    import * as sapper from '@sapper/app';


    let username = '';
    let password = '';
    let disabled = true;
    let loading = false;

    let url = 'http://localhost:5000/api/login';

    function handleClick() {
        let userParsed = username.toLowerCase();

        console.log("Length", userParsed.length, "Not parsed", username.length);
        console.log("Type", typeof(userParsed), "Type not parsed", typeof(username));

        loading = true;
        console.log("Usuario: ", userParsed, "Contraseña: ", password);
        fetch(url, {
            method: 'post',
            body: JSON.stringify({username, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(Response => {
            return Response.json();
        }).then(Content => {
            console.log('Respuesta del server: ', Content);
            usuario.update(user => {
                user.clase = Content.person.clase || 'Directiva';
                user.id = Content.person._id;
                user.name = Content.person.name;
                user.title = Content.person.title;
                user.type = Content.person.type;
                return user;
            });

            if(Content.login) {
                if(Content.person.type == 'Maestro') {
                    sapper.goto('maestro');
                } else {
                    sapper.goto('directiva');
                }                
            } else {
                alert('No autorizado')
            }

        });

    }

    function checkPass() {
        if(password !== '') {
            disabled = false;
        }
    }

</script>

<style>
    .has-button-centered {
        margin-left: auto;
    }
</style>

        {#if loading}

        <div transition:fade class="field is-grouped is-grouped-centered">
            <div class="control">
                <a class="button is-large is-rounded is-loading">Loading</a>
            </div>
        </div>

        {:else}
        <div transition:fade class="container has-text-centered">
                <h1 class="title is-4">Inicio de Sesion</h1>
                <div class="field">
                    <label for="username" class="label">Usuario</label>
                    <div class="control has-icons-left">
                        <input type="text" class="input" placeholder="Usuario" style="text-transform:lowercase" bind:value={username}>
                        <span class="icon is-small is-left">
                            <i class="fas fa-user"></i>
                        </span>
                    </div>
                </div>
            
                <div class="field">
                    <label for="password" class="label">Contraseña</label>
                    <div class="control has-icons-left">
                        <input type="password" class="input" placeholder="Contraseña" bind:value={password} on:change={checkPass}>
                        <span class="icon is-small is-left">
                            <i class="fas fa-user"></i>
                        </span>
                    </div>
                </div>
            
                <div class="field is-grouped is-grouped-centered">
                    <div class="control">
                        <button class="button is-primary has-button-centered" on:click={handleClick}>Iniciar Sesión</button>
                    </div>
                </div>
            
            </div>
        {/if}
