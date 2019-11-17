import { writable } from "svelte/store";

export const usuario = writable({
    clase: '',
    id: '',
    name: '',
    title: '',
    type: ''
});
