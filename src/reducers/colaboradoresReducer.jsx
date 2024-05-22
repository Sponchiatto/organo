import { v4 as uuidv4 } from "uuid"; // Importa a função uuidv4 do pacote uuid para gerar IDs únicos

// Definição das ações que o reducer pode manipular
export const ADD_COLABORADOR = 'ADD_COLABORADOR';
export const DELETE_COLABORADOR = 'DELETE_COLABORADOR';
export const TOGGLE_FAVORITO = 'TOGGLE_FAVORITO';
export const INITIALIZE_COLABORADORES = 'INITIALIZE_COLABORADORES';

// Definição do reducer para gerenciar o estado dos colaboradores
const colaboradoresReducer = (state, action) => {
    switch (action.type) {

        // Ação para inicializar o estado dos colaboradores
        case INITIALIZE_COLABORADORES:
            return action.payload; // action.payload é a lista de colaboradores para inicializar o estado

        // Ação para adicionar um novo colaborador
        case ADD_COLABORADOR:
            return [...state, { ...action.payload, id: uuidv4() }]; // Adiciona o novo colaborador ao estado com um ID único

        // Ação para deletar um colaborador
        case DELETE_COLABORADOR:
          // Remove o colaborador cujo ID corresponde ao action.payload
            return state.filter(colaborador => colaborador.id !== action.payload); 
            
        // Ação para alternar o status de favorito de um colaborador
        case TOGGLE_FAVORITO:
            return state.map(colaborador => 
                colaborador.id === action.payload
                    ? { ...colaborador, favorito: !colaborador.favorito } // Alterna o valor de 'favorito' para o colaborador correspondente
                    : colaborador
            );

        // Retorna o estado atual para qualquer ação desconhecida
        default:
            return state;
    }
}

export default colaboradoresReducer; // Exporta o reducer como padrão
