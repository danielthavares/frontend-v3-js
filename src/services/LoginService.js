import { httpClient } from "../infra/httpClient";
import { ordenarMenu } from "../infra/menu";
import { useAccountStore } from "../stores/account";

export function useLoginService() {
  const url = "/account";

  const logar = ({ idCompanhia, login, senha }) => {
    return httpClient().post({
      url,
      data: { idCompanhia, login, senha },
      onSuccess: (res) => {
        const { login, nome, permissao, token } = res.data;
        const accountStore = useAccountStore();

        accountStore.add({
          login,
          nome,
          perfis: permissao.perfis,
          menus: ordenarMenu(permissao.menus),
          token,
        });
      },
    });
  };

  return { logar };
}
