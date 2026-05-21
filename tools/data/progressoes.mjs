// Tabelas de progressão de BA (Base de Ataque), JP (Jogada de Proteção) e XP
// por nível, extraídas do SRD oficial do Old Dragon 2e (pack "classes").
// Cada classe do Ekhoria herda a progressão do seu arquétipo.
//
// Observação: o nível 1 não possui XP no schema do sistema (só ba/jp).
// O nível 13 do Ladrão no SRD vinha com "34000" (typo evidente entre 260000 e
// 420000); corrigido aqui para 340000.

// [ba, jp, xp]  — xp do nível 1 é ignorado.
const TABELAS = {
  guerreiro: [
    [1, 5, 0], [2, 5, 2000], [3, 6, 4000], [4, 6, 7000], [5, 8, 10000],
    [6, 8, 20000], [7, 10, 30000], [8, 10, 40000], [9, 11, 50000], [10, 11, 100000],
    [11, 13, 200000], [12, 13, 300000], [13, 14, 400000], [14, 14, 500000], [15, 16, 600000],
  ],
  clerigo: [
    [1, 5, 0], [1, 5, 1500], [1, 5, 3000], [3, 7, 5500], [3, 7, 8500],
    [3, 7, 17000], [5, 9, 27000], [5, 9, 37000], [5, 9, 47000], [7, 11, 94000],
    [7, 11, 190000], [7, 11, 280000], [9, 13, 370000], [9, 13, 460000], [9, 13, 550000],
  ],
  mago: [
    [0, 5, 0], [1, 5, 2500], [1, 5, 5000], [1, 5, 8500], [2, 7, 11500],
    [2, 7, 23000], [2, 7, 33000], [3, 7, 43000], [3, 7, 53000], [3, 10, 106000],
    [4, 10, 210000], [4, 10, 320000], [4, 10, 430000], [5, 13, 540000], [5, 13, 650000],
  ],
  ladrao: [
    [1, 5, 0], [1, 5, 1000], [2, 5, 2000], [2, 5, 4000], [3, 8, 7000],
    [3, 8, 14000], [4, 8, 24000], [4, 8, 34000], [5, 11, 44000], [5, 11, 88000],
    [6, 11, 180000], [6, 11, 260000], [7, 14, 340000], [7, 14, 420000], [8, 14, 500000],
  ],
};

// Converte a tabela [ba,jp,xp] no formato esperado pelo schema do sistema:
// nível 1 = { ba, jp }; níveis 2..15 = { ba, jp, xp }.
export function progressao(arquetipo) {
  const tab = TABELAS[arquetipo];
  if (!tab) throw new Error(`Arquétipo desconhecido: ${arquetipo}`);
  const levels = {};
  tab.forEach(([ba, jp, xp], i) => {
    const lvl = i + 1;
    levels[String(lvl)] = lvl === 1 ? { ba, jp } : { ba, jp, xp };
  });
  return levels;
}
