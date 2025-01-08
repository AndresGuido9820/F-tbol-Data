"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = __importStar(require("puppeteer"));
function scrollToLoadMore(page) {
    return __awaiter(this, void 0, void 0, function* () {
        let previousHeight = 0;
        while (true) {
            previousHeight = yield page.evaluate(() => document.body.scrollHeight);
            // Desplazarse hacia abajo
            yield page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            // Esperar un tiempo para que se cargue el nuevo contenido
            // Esperar 2 segundos (ajusta si es necesario)
            // Verificar si el nuevo contenido se cargó
            const newHeight = yield page.evaluate(() => document.body.scrollHeight);
            if (newHeight === previousHeight)
                break; // Salir si no hay más contenido
        }
    });
}
function waitForPageLoad(page) {
    return __awaiter(this, void 0, void 0, function* () {
        yield page.waitForNavigation({ waitUntil: 'load' });
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer.launch({
        headless: false, // Mostrar el navegador en pantalla
    });
    const page = yield browser.newPage();
    // Navegar a una URL y esperar a que la carga de la página se complete
    yield page.goto('https://www.google.com/search?q=premier+league&rlz=1C1GCEA_enCO1133CO1133&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIPCAEQLhgKGIMBGLEDGIAEMgwIAhAAGAoYsQMYgAQyDAgDEAAYChixAxiABDIMCAQQABgKGLEDGIAEMg8IBRAAGAoYgwEYsQMYgAQyDAgGEAAYChixAxiABDIJCAcQABgKGIAEMgkICBAuGAoYgATSAQg0NjM5ajBqN6gCCLACAQ&sourceid=chrome&ie=UTF-8&si=ACC90nzJ3Gke-XGrC-3zOSz6W7egol1n4MGdgJZ3Sd3AW1n4kf54vpDa5hFmzqQu9w0xzvPjrGdo3NlOJK187DvimhekXzqQIp60xyfs3KRGBGPvhIyP8v68x4bNjDT_xjYDbnGx5tZc&ictx=1&ved=2ahUKEwjEq4Gmz-KKAxWISTABHVgyFjoQyNoBKAB6BAgPEAA#sie=lg;/g/11vs_26ffm;2;/m/02_tc;bbbs;hd;;;;2025-01-20T20:00:00Z&wptab=si:ACC90nxf9KAEpHgHfAikz_8O8Y5Hh0ixj21IrePIxqwFME2hPrAtHgxFMhMJd22o6cAVUtabSJThEHz0rv3ESLFKsWwBsxNWDmoOuxSk4SPD7_CvBmGQjdGZN9oE91BCT7VqQ7p9DqITO_F9BxwuzfH72dJlId24l0P74bvWF1U8YqrR7qGeTVs%3D', { waitUntil: 'load' });
    // Esperar a que la página se cargue completamente
    yield waitForPageLoad(page);
    // Llamar a la función para hacer scroll y cargar más contenido
    yield scrollToLoadMore(page);
    const data = yield page.evaluate(() => {
        const jornadaData = {}; // Objeto para almacenar las jornadas
        const obfcabfDivs = document.querySelectorAll('div.OcbAbf');
        // Procesar las jornadas y partidos
        obfcabfDivs.forEach((obfcabfDiv, index) => {
            var _a;
            const jornadaKey = ((_a = obfcabfDiv.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || `Jornada ${index + 1}`;
            const table = document.querySelector('table');
            if (table) {
                const rows = table.querySelectorAll('tbody > tr');
                const matches = [];
                rows.forEach((row) => {
                    var _a, _b, _c, _d;
                    const cells = row.querySelectorAll('td.tns-c');
                    if (cells.length >= 2) {
                        const team1 = (_b = (_a = cells[0].querySelector('.liveresults-sports-immersive__hide-element')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim();
                        const team2 = (_d = (_c = cells[1].querySelector('.liveresults-sports-immersive__hide-element')) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim();
                        if (team1 && team2) {
                            matches.push({ teams: [team1, team2] });
                        }
                    }
                });
                jornadaData[jornadaKey] = matches; // Asignar los partidos a la jornada
            }
        });
        return jornadaData; // Devolver el objeto final
    });
    console.log(data); // Mostrar el diccionario en la consola
    yield browser.close(); // Cerrar el navegador
}))();
