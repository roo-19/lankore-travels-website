import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                sigiriya: resolve(__dirname, 'destinations/sigiriya.html'),
                kandy: resolve(__dirname, 'destinations/kandy.html'),
                ella: resolve(__dirname, 'destinations/ella.html'),
                yala: resolve(__dirname, 'destinations/yala.html'),
                colombo: resolve(__dirname, 'destinations/colombo.html'),
                galle: resolve(__dirname, 'destinations/galle.html'),
                nuwara_eliya: resolve(__dirname, 'destinations/nuwara-eliya.html'),
                anuradhapura: resolve(__dirname, 'destinations/anuradhapura.html'),
                knuckles: resolve(__dirname, 'destinations/knuckles.html'),
                polonnaruwa: resolve(__dirname, 'destinations/polonnaruwa.html'),
                dambulla: resolve(__dirname, 'destinations/dambulla.html'),
                jaffna: resolve(__dirname, 'destinations/jaffna.html'),
            }
        }
    }
});
