import { v4 as uuidv4 } from "uuid";

export const ADD_COLABORADOR = 'ADD_COLABORADOR';
export const DELETE_COLABORADOR = 'DELETE_COLABORADOR';
export const TOGGLE_FAVORITO = 'TOGGLE_FAVORITO';
export const INITIALIZE_COLABORADORES = 'INITIALIZE_COLABORADORES';

const colaboradoresReducer = (state, action) => {
    switch (action.type) {
        case INITIALIZE_COLABORADORES:
            return action.payload;
            
        case ADD_COLABORADOR:
            return [...state, { ...action.payload, id: uuidv4() }];

        case DELETE_COLABORADOR:
      return state.filter(colaborador => colaborador.id !== action.payload);

      case TOGGLE_FAVORITO:
      return state.map(colaborador => 
        colaborador.id === action.payload
          ? { ...colaborador, favorito: !colaborador.favorito }
          : colaborador
      );

      default:
      return state;
    }
}

export default colaboradoresReducer