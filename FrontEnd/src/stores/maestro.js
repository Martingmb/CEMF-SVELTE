import { writable } from "svelte/store";

export const maestro = writable({
    reporteSemanal: false,
    reporteDelMaestro: false,
    aseo: false
});
