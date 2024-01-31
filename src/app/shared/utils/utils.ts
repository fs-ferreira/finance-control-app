import toastr from 'toastr';

export const showSuccessMessage = (customMessage?: string) => {
  toastr.success(customMessage || 'Solicitação processada com sucesso');
};

export const showErrorMessage = (customMessage?: string) => {
  toastr.error(customMessage || 'Ocorreu um erro ao processar a solicitação');
};

export const toDate = (dateStr) => {
  const parts = dateStr.split('/');
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

export const monthList = () => {
  return [
    { name: 'Janeiro', value: 1 },
    { name: 'Fevereiro', value: 2 },
    { name: 'Março', value: 3 },
    { name: 'Abril', value: 4 },
    { name: 'Maio', value: 5 },
    { name: 'Junho', value: 6 },
    { name: 'Julho', value: 7 },
    { name: 'Agosto', value: 8 },
    { name: 'Setembro', value: 9 },
    { name: 'Outubro', value: 10 },
    { name: 'Novembro', value: 11 },
    { name: 'Dezembro', value: 12 },
  ];
};

export const yearList = () => {
  return [
    { name: '2025', value: 2025 },
    { name: '2024', value: 2024 },
    { name: '2023', value: 2023 },
    { name: '2022', value: 2022 },
    { name: '2021', value: 2021 },
    { name: '2020', value: 2020 },
    { name: '2019', value: 2019 },
    { name: '2018', value: 2018 },
    { name: '2017', value: 2017 },
  ];
};

export function enumOptions<T>(
  enumType: T
): Array<{ name: string; value: any }> {
  return Object.entries(enumType).map(([name, value]) => {
    return { name, value };
  });
}
