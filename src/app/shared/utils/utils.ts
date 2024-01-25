import toastr from 'toastr'

export const showSuccessMessage = (customMessage?:string) => {
  toastr.success(customMessage || 'Solicitação processada com sucesso');
}

export const showErrorMessage = (customMessage?:string) => {
  toastr.error(customMessage || 'Ocorreu um erro ao processar a solicitação');
}
