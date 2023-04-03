const msg500 =
  "Ocorreu um erro ao executar a operação. Por favor tente mais tarde.";
const msg401 = "Seu acesso ao sistema expirou. Efetue o login.";
const msg403 = "Você não tem permissão para acessar este recurso.";

/**
 * Função que trata de erros das requisições e realiza a transformação para um objeto de retorno padrão.
 * */
export function errorResponse(err) {
  let response = { status: 0, errors: [], failures: {} };

  if (err.response) {
    response.status = err.response.status;

    switch (err.response.status) {
      case 400:
        response.errors = err.response.data["errors"];
        response.failures = err.response.data["failures"];
        break;
      case 401:
        response.errors.push(msg401);
        break;
      case 403:
        response.errors.push(msg403);
        break;
      case 404:
        response.errors = err.response.data["errors"];
        break;
      case 500:
      default:
        response.errors = err.response.data["errors"]
          ? err.response.data.errors
          : [msg500];
        break;
    }
  } else if (err.request) {
    response.errors.push(err.request);
  } else {
    response.errors.push(err.message);
  }

  if (!response["errors"]) response.errors = [];
  if (!response["failures"]) response.failures = {};

  return response;
}
