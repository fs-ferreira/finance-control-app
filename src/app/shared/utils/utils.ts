import toastr from 'toastr';

export const showSuccessMessage = (customMessage?: string) => {
  toastr.success(customMessage || 'Solicitação processada com sucesso');
};

export const showErrorMessage = (customMessage?: string) => {
  toastr.error(customMessage || 'Ocorreu um erro ao processar a solicitação');
};

export const toDate = (dateStr) => {
  var parts = dateStr.split('/');
  return new Date(parts[2], parts[1] - 1, parts[0]);
};

export const ptBRDateLocale = () => {
  return {
    firstDayOfWeek: 0,
    dayNames: [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
    monthNamesShort: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ],
    today: 'Hoje',
    clear: 'Limpar',
  };
};

export function enumOptions<T>(
  enumType: T
): Array<{ name: string; value: any }> {
  return Object.entries(enumType).map(([name, value]) => {
    return {
      name: name,
      value: value,
    };
  });
}
