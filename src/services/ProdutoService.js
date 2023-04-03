import { httpClient } from "../infra/httpClient";

export function useProdutoService() {
  const url = "/produto";

  const { get, post, put, remove } = httpClient();

  const pesquisar = ({ page, params }) =>
    get({ url: page ? page : url, params });

  const novo = (data) => post({ url, data });

  const editar = ({ id, data }) => put({ url: `${url}/${id}`, data });

  const carregar = (id) => get({ url: `${url}/${id}` });

  const excluir = (id) => remove({ url: `${url}/${id}` });

  return {
    pesquisar,
    novo,
    editar,
    carregar,
    excluir,
  };
}
