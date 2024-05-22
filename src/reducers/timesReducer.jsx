// Extra: "payload" termo comumente usado em programação para se referir aos dados que são 
// enviados junto com uma ação para informar ao reducer como o estado deve ser atualizado. 
// O payload é uma propriedade do objeto action que contém os dados necessários para executar a ação específica.

// {
//   type: 'TIPO_DA_ACAO', // String que define o tipo de ação
//   payload: {/* dados necessários para realizar a ação */} // Dados específicos para a ação
// }

import { v4 as uuidv4 } from "uuid"; // Importa a função uuidv4 do pacote uuid para gerar IDs únicos

// Definição das ações que o reducer pode manipular
export const ADD_TIME = 'ADD_TIME';
export const UPDATE_COR = 'UPDATE_COR';
export const INITIALIZE_TIMES = 'INITIALIZE_TIMES';
export const DELETE_TIME = "DELETE_TIME";

// Definição do reducer para gerenciar o estado dos times
const timesReducer = (state, action) => {
  switch (action.type) {

    // Ação para inicializar o estado dos times
    case INITIALIZE_TIMES:
      return action.payload;

    // Ação para adicionar um novo time
    case ADD_TIME:
      return [...state, { ...action.payload, id: uuidv4() }];

    // Ação para atualizar a cor de um time existente
    case UPDATE_COR:
      return state.map(time => 
        time.id === action.payload.id
          ? { ...time, cor: action.payload.cor }
          : time
      );

    // Ação para deletar um time
    case DELETE_TIME: 
      return state.filter((time) => time.id !== action.payload);

    // Retorna o estado atual para qualquer ação desconhecida
    default:
      return state;
  }
};

export default timesReducer; // Exporta o reducer como padrão
