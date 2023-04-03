import { useCategoriaStore } from "../stores/categoria";
import { httpClient } from "../infra/httpClient";

export function useCategoriaService() {
  const url = "/categoria";

  const categoriStore = useCategoriaStore();

  const carregar = () => {
    if (categoriStore.categorias.length < 1) {
      return httpClient().get({
        url,
        onSuccess: (res) => {
          categoriStore.addCategorias(res.data);
        },
      });
    }

    return Promise.resolve();
  };

  return { carregar };
}
