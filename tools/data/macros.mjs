// Macros do módulo.
//
// Cada `comando` é um chamador de uma linha. A lógica vive em
// ekhoria-module/ekhoria.js, onde é código versionado, revisável em diff e
// sujeito às mesmas regras do resto do módulo. Macro compilada dentro do
// LevelDB não aparece em diff nenhum: quem for lê-la daqui a um ano vê o
// resultado sem a história, e é assim que ela vira intocável.

export const macros = [
  {
    nome: "Contratar",
    img: "icons/svg/village.svg",
    comando:
      `// Cria a ficha de contratado (retainer) a partir do statblock do livro.\n`
      + `// A lógica está em ekhoria.js — veja a função contratarDialogo().\n`
      + `if (!game.ekhoria?.contratar) {\n`
      + `  ui.notifications.error("Ekhoria: o módulo não está ativo neste mundo.");\n`
      + `} else {\n`
      + `  game.ekhoria.contratar();\n`
      + `}\n`,
  },
];
