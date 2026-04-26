// INFORMACIÓN DEL APP 
export let id = 'notaswii'
export let app = 'NotasWii'
export let icon = 'fa-book-open'
export let desc = 'Escribe notas que te inspiren en el dia ';
export let lanzamiento = 2026;
export let ipdev = import.meta.env.VITE_DEV;
export let by = '@wilder.taype';
export let linkme = 'https://wtaype.github.io/';
export let version = 'v9';

/** ACTUALIZAR AL TAG POR SEGURIDAD [TAG NUEVO] (1)
git tag v9 -m "Version v9" ; git push origin v9

ACTUALIZACIÓN AL MAIN PRINCIPAL DEL PROYECTO [MAIN] (2)
git add . ; git commit -m "Actualizacion Principal v9.10.10" ; git push origin main

// REEMPLAZAR TAG DE SEGURIDAD EXISTENTE [TAG REMPLAZO] (3)
git tag -d v9 ; git tag v9 -m "Version v9 actualizada" ; git push origin v9 --force

// Actualizar versiones de seguridad [ELIMINAR CARPETA - ARCHIVO ONLINE] (4)
git rm --cached skills-lock.json ; git commit -m "Archivo Eliminado" ; git push origin main
git rm -r --cached .claude/ ; git commit -m "Carpeta Eliminada" ; git push origin main
 ACTUALIZACION TAG[END] */
