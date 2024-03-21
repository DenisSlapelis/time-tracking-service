export enum STATUS_CODE {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    VALIDATION_ERROR = 400,
    NOT_FOUND = 404,
    SERVER_ERROR = 500,
}

export const STATUS_CODE_CAUSE = {
    'Not Found': STATUS_CODE.NOT_FOUND,
    'Validation Error': STATUS_CODE.VALIDATION_ERROR,
};

export const MONTHS = {
    0: 'Janeiro',
    1: 'Fevereiro',
    2: 'Março',
    3: 'Abril',
    4: 'Maio',
    5: 'Junho',
    6: 'Julho',
    7: 'Agosto',
    8: 'Setembro',
    9: 'Outubro',
    10: 'Novembro',
    11: 'Dezembro',
};
