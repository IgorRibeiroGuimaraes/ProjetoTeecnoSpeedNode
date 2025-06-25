export function validarCamposObrigatorios(campos: { [key: string]: string | undefined }): string | null {
  for (const [campo, valor] of Object.entries(campos)) {
    if (!valor) {
      return `Campo não encontrado: ${campo}`;
    }
  }
  return null;
}