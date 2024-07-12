import { writable } from "svelte/store";
import { browser } from "$app/environment";

export const authToken = writable<string | null>(null);

export const setAuthToken = (token: string | null) => {
    authToken.set(token);
    if (token) {
        if (browser) {
            localStorage.setItem('authToken', token);
        }

    } else {
        if (browser) {
            localStorage.removeItem('authToken');
        }
    }
}

if (browser) {
    const token = localStorage.getItem('authToken');
    if (token) {
        setAuthToken(token);
    }
}