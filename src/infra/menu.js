//Ordena o menu com base no menu pai
const orderByMenuPai = (a, b) => {
  if (a.menuPai === null && b.menuPai !== null) {
    return -1;
  }
  if (a.menuPai !== null && b.menuPai === null) {
    return 1;
  }

  return 0;
};

//Ordena o menu com base no atributo ordem
const orderByOrdem = (a, b) => {
  if (a.ordem < b.ordem) {
    return -1;
  }
  if (a.ordem > b.ordem) {
    return 1;
  }

  return 0;
};

const ordenarMenu = (rawMenu) => {
  let menus = rawMenu.map((i) => {
    return {
      idMenu: i.idMenu,
      descricao: i.descricao,
      ordem: i.ordem,
      recurso: i.recurso,
      menuPai: i.menuPai !== null ? { idMenu: i.menuPai.idMenu } : null,
    };
  });

  menus.sort(orderByOrdem).sort(orderByMenuPai);
  let master = menus.filter((x) => x.menuPai === null);
  let itens = menus.filter((x) => x.menuPai !== null);
  master.forEach((x) => {
    x.itens = itens.filter((y) => y.menuPai.idMenu === x.idMenu);
  });
  let sub = menus.filter((x) => x.menuPai !== null);
  master.forEach((x) => {
    x.itens.forEach((y) => {
      y.subItens = sub.filter((z) => z.menuPai.idMenu === y.idMenu);
    });
  });
  return master;
};

export { ordenarMenu };
