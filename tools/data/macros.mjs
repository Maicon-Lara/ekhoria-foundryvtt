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
    // As duas falhas possíveis são DIFERENTES e mandam procurar em lugares
    // diferentes, então a macro as separa. A primeira versão dizia "o módulo não
    // está ativo" sem nunca ter verificado isso — e quando o script estava
    // apenas em cache, a mensagem mandava o usuário conferir a coisa certa pelo
    // motivo errado, que é pior do que não dizer nada.
    comando:
      `// Cria a ficha de contratado (retainer) a partir do statblock do livro.\n`
      + `// A lógica está em ekhoria.js — veja a função contratarDialogo().\n`
      + `const mod = game.modules.get("ekhoria");\n`
      + `if (!mod?.active) {\n`
      + `  ui.notifications.error("Ekhoria: o módulo não está ativo neste mundo.");\n`
      + `} else if (!game.ekhoria?.contratar) {\n`
      + `  ui.notifications.error(\n`
      + `    \`Ekhoria \${mod.version}: o módulo está ativo, mas o script não registrou a função. \`\n`
      + `    + "Recarregue com Ctrl+Shift+R (o navegador guarda o ekhoria.js em cache). "\n`
      + `    + "Se persistir, abra o console com F12 e procure por 'Ekhoria |'."\n`
      + `  );\n`
      + `} else {\n`
      + `  game.ekhoria.contratar();\n`
      + `}\n`,
  },
];
