import * as puppeteer from 'puppeteer';

interface Match {
  teams: [string, string]; // Cada partido tiene dos equipos
}

interface JornadaData {
  [jornada: string]: Match[]; // Clave: nombre de la jornada, Valor: lista de partidos
}

async function scrollToLoadMore(page: puppeteer.Page) {
  let previousHeight = 0;

  while (true) {
    previousHeight = await page.evaluate(() => document.body.scrollHeight);

    // Desplazarse hacia abajo
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Esperar un tiempo para que se cargue el nuevo contenido
   // Esperar 2 segundos (ajusta si es necesario)

    // Verificar si el nuevo contenido se cargó
    const newHeight = await page.evaluate(() => document.body.scrollHeight);
    if (newHeight === previousHeight) break; // Salir si no hay más contenido
  }
}

async function waitForPageLoad(page: puppeteer.Page) {
  await page.waitForNavigation({ waitUntil: 'load' });
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // Mostrar el navegador en pantalla
  });

  const page = await browser.newPage();

  // Navegar a una URL y esperar a que la carga de la página se complete
  await page.goto('https://www.google.com/search?q=premier+league&rlz=1C1GCEA_enCO1133CO1133&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIPCAEQLhgKGIMBGLEDGIAEMgwIAhAAGAoYsQMYgAQyDAgDEAAYChixAxiABDIMCAQQABgKGLEDGIAEMg8IBRAAGAoYgwEYsQMYgAQyDAgGEAAYChixAxiABDIJCAcQABgKGIAEMgkICBAuGAoYgATSAQg0NjM5ajBqN6gCCLACAQ&sourceid=chrome&ie=UTF-8&si=ACC90nzJ3Gke-XGrC-3zOSz6W7egol1n4MGdgJZ3Sd3AW1n4kf54vpDa5hFmzqQu9w0xzvPjrGdo3NlOJK187DvimhekXzqQIp60xyfs3KRGBGPvhIyP8v68x4bNjDT_xjYDbnGx5tZc&ictx=1&ved=2ahUKEwjEq4Gmz-KKAxWISTABHVgyFjoQyNoBKAB6BAgPEAA#sie=lg;/g/11vs_26ffm;2;/m/02_tc;bbbs;hd;;;;2025-01-20T20:00:00Z&wptab=si:ACC90nxf9KAEpHgHfAikz_8O8Y5Hh0ixj21IrePIxqwFME2hPrAtHgxFMhMJd22o6cAVUtabSJThEHz0rv3ESLFKsWwBsxNWDmoOuxSk4SPD7_CvBmGQjdGZN9oE91BCT7VqQ7p9DqITO_F9BxwuzfH72dJlId24l0P74bvWF1U8YqrR7qGeTVs%3D'
  , { waitUntil: 'load' });

  // Esperar a que la página se cargue completamente
  await waitForPageLoad(page);

  // Llamar a la función para hacer scroll y cargar más contenido
  await scrollToLoadMore(page);

  const data: JornadaData = await page.evaluate(() => {
    const jornadaData: JornadaData = {}; // Objeto para almacenar las jornadas
    const obfcabfDivs = document.querySelectorAll('div.OcbAbf');

    // Procesar las jornadas y partidos
    obfcabfDivs.forEach((obfcabfDiv, index) => {
      const jornadaKey: string = obfcabfDiv.textContent?.trim() || `Jornada ${index + 1}`;
      const table = document.querySelector('table');

      if (table) {
        const rows = table.querySelectorAll('tbody > tr');
        const matches: Match[] = [];

        rows.forEach((row) => {
          const cells = row.querySelectorAll('td.tns-c');
          if (cells.length >= 2) {
            const team1 = cells[0].querySelector('.liveresults-sports-immersive__hide-element')?.textContent?.trim();
            const team2 = cells[1].querySelector('.liveresults-sports-immersive__hide-element')?.textContent?.trim();

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

  await browser.close(); // Cerrar el navegador
})();
