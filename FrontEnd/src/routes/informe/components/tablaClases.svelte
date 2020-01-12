<script>
    import { onMount } from "svelte";

    export let dataOfrenda;
    export let dataAseo;

    let data = [];
    let dataPost = [];

    onMount(() => {
        processData(dataOfrenda, dataAseo);
    })

    function processData(ofrenda, aseo) {

        let clases = new Object();

        console.log("Ofrenda ->", ofrenda, "Aseo ->", aseo);

        clases["Directiva"] = {
                nombre: "Directiva",
                asistencia: 0,
                ofrenda: 0,
                aseo: 0,
                biblias: 0,
                expositores: 'Directiva',
                capitulos: 0,
                visitantes: 'Directiva'
            }

        for (let index = 0; index < ofrenda.length; index++) {
            const element = ofrenda[index];

            clases[element.clase] = {
                nombre: "",
                asistencia: 0,
                ofrenda: 0,
                aseo: 0,
                capitulos: 0,
                biblias: 0,
                expositores: 0,
                visitantes: 0
            }
            
        }

        for (let index = 0; index < ofrenda.length; index++) {
            const element = ofrenda[index];

            clases[element.clase].nombre = element.clase;
            clases[element.clase].asistencia = element.alumnos;
            clases[element.clase].biblias = element.biblias;
            clases[element.clase].capitulos = element.capitulosLeidos;
            clases[element.clase].expositores = element.expositores;
            clases[element.clase].visitantes = element.visitantes;
            clases[element.clase].ofrenda += Number(element.ofrenda.$numberDecimal);
            
        }

        for (let index = 0; index < aseo.length; index++) {
            const element = aseo[index];
            console.log(clases[element.clase], "KEY: ", element.clase);

            if(clases[element.clase] == undefined) {
                clases[element.clase] = {
                    nombre: element.clase,
                    asistencia: 0,
                    ofrenda: 0,
                    aseo: 0,
                    biblias: 0,
                    expositores: 0,
                    capitulos: 0,
                    visitantes: 0
                }
            }

            clases[element.clase].aseo += Number(element.monto.$numberDecimal);

            if(element.clase == 'Directiva') {
                clases[element.clase].asistencia += 1;
            }
            
        }

        for (const key in clases) {
            if (clases.hasOwnProperty(key)) {
                const element = clases[key];
                data = [...data, element];
            }
        }

        let Directiva = {
            nombre: "Directiva"
        }

        let clasesOrdenadas = ["Directiva", "Angelitos", "Estrellitas", "Soldaditos", "Amigos", "Hijos del Rey", "Siervos", "Seguidores", "Jovenes", "Adultos", "Familia de la Fe", "Nuevos Creyentes"];


    }

</script>

<style>
</style>

<table class="table">
    <thead>
        <th>Clase</th>
        <th>Asistencia</th>
        <th>Visitantes</th>
        <th>Biblias</th>
        <th>Expositores</th>
        <th>Capitulos Leidos</th>
        <th>Ofrenda</th>
        <th>Aseo</th>
    </thead>
    <tfoot>
        <th>Clase</th>
        <th>Asistencia</th>
        <th>Visitantes</th>
        <th>Biblias</th>
        <th>Expositores</th>
        <th>Capitulos Leidos</th>
        <th>Ofrenda</th>
        <th>Aseo</th>
    </tfoot>
    <tbody>
        {#each data as clase}
            <tr>
                <td><strong>{clase.nombre}</strong></td>
                <td>{clase.asistencia}</td>
                <td>{clase.visitantes}</td>
                <td>{clase.biblias}</td>
                <td>{clase.expositores}</td>
                <td>{clase.capitulos}</td>
                <td>${clase.ofrenda}</td>
                <td>${clase.aseo}</td>
            </tr>
        {/each}
    </tbody>
</table>