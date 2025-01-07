"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({
        headless: false, // Mostrar el navegador en pantalla
    });
    const page = yield browser.newPage();
    // Escuchar mensajes de la consola del navegador y enviarlos a la consola local
    page.on('console', (msg) => {
        console.log('PAGE LOG:', msg.text()); // Imprimir el mensaje en la consola local
    });
    // Navegar a una URL
    yield page.goto('https://www.google.com/search?q=premier+league&rlz=1C1GCEA_enCO1133CO1133&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIPCAEQLhgKGIMBGLEDGIAEMgwIAhAAGAoYsQMYgAQyDAgDEAAYChixAxiABDIMCAQQABgKGLEDGIAEMg8IBRAAGAoYgwEYsQMYgAQyDAgGEAAYChixAxiABDIJCAcQABgKGIAEMgkICBAuGAoYgATSAQg0NjM5ajBqN6gCCLACAQ&sourceid=chrome&ie=UTF-8&si=ACC90nzJ3Gke-XGrC-3zOSz6W7egol1n4MGdgJZ3Sd3AW1n4kf54vpDa5hFmzqQu9w0xzvPjrGdo3NlOJK187DvimhekXzqQIp60xyfs3KRGBGPvhIyP8v68x4bNjDT_xjYDbnGx5tZc&ictx=1&ved=2ahUKEwjEq4Gmz-KKAxWISTABHVgyFjoQyNoBKAB6BAgPEAA#sie=lg;/g/11vs_26ffm;2;/m/02_tc;bbbs;hd;;;;2025-01-20T20:00:00Z&wptab=si:ACC90nxf9KAEpHgHfAikz_8O8Y5Hh0ixj21IrePIxqwFME2hPrAtHgxFMhMJd22o6cAVUtabSJThEHz0rv3ESLFKsWwBsxNWDmoOuxSk4SPD7_CvBmGQjdGZN9oE91BCT7VqQ7p9DqITO_F9BxwuzfH72dJlId24l0P74bvWF1U8YqrR7qGeTVs%3D');
    // Esperar a que la tabla esté presente en la página
    yield page.waitForSelector('table'); // Esperar a que aparezca la tabla
    const data = yield page.evaluate(() => {
        const jornadaData = {}; // Objeto para almacenar las jornadas
        const obfcabfDivs = document.querySelectorAll('div.OcbAbf');
        console.log(`hola desde ${obfcabfDivs.length}`); // Esto se verá en la consola del navegador
        // Seleccionar jornadas
        obfcabfDivs.forEach((obfcabfDiv, index) => {
            var _a;
            const jornadaKey = ((_a = obfcabfDiv.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || `Jornada ${index + 1}`; // Usar texto o índice como clave
            const table = document.querySelector('table'); // Buscar la tabla dentro de la jornada
            if (table) {
                const rows = table.querySelectorAll('tbody > tr'); // Filas de la tabla
                const matches = [];
                rows.forEach((row) => {
                    var _a, _b, _c, _d;
                    const cells = row.querySelectorAll('td.tns-c');
                    if (cells.length >= 2) {
                        const team1 = (_b = (_a = cells[0]
                            .querySelector('.liveresults-sports-immersive__hide-element')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim();
                        const team2 = (_d = (_c = cells[1]
                            .querySelector('.liveresults-sports-immersive__hide-element')) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim();
                        if (team1 && team2) {
                            matches.push({ teams: [team1, team2] }); // Agregar los rivales como un par
                        }
                    }
                });
                jornadaData[jornadaKey] = matches; // Asignar los partidos a la jornada
            }
        });
        return jornadaData; // Devolver el objeto final
    });
    console.log(data); // Mostrar el diccionario en la consola local
    yield browser.close(); // Cerrar el navegador
}))();
