import Veiculo from './Veiculo';
import Aluguel from './Aluguel';
import Cliente from './Cliente';


const fs = require('fs');
const path = require('path');

/**
 */
export class Locadora {
    constructor(
        private _nome: string,
        private _cnpj: string,
        private _veiculos: Veiculo[],
        private _alugueis: Aluguel[],
        private _veiculosDisponiveis:Veiculo[],
        private _alugueisAtivos: Aluguel[]
        ) {
	}



    /**
     * Getter $nome
     * @return {string}
     */
	public get $nome(): string {
		return this._nome;
	}

    /**
     * Setter $nome
     * @param {string} value
     */
	public set $nome(value: string) {
		this._nome = value;
	}

    /**
     * Getter $cnpj
     * @return {string}
     */
	public get $cnpj(): string {
		return this._cnpj;
	}

    /**
     * Setter $cnpj
     * @param {string} value
     */
	public set $cnpj(value: string) {
		this._cnpj = value;
	}

    /**
     * Getter $veiculosDisponiveis
     * @return {Veiculo[]}
     */
	public get $veiculosDisponiveis(): Veiculo[] {
		return this._veiculosDisponiveis;
	}

    /**
     * Setter $veiculosDisponiveis
     * @param {Veiculo[]} value
     */
	public set $veiculosDisponiveis(value: Veiculo[]) {
		this._veiculosDisponiveis = value;
	}

    /**
     * Getter $alugueisAtivos
     * @return {Aluguel[]}
     */
	public get $alugueisAtivos(): Aluguel[] {
		return this._alugueisAtivos;
	}

    /**
     * Setter $alugueisAtivos
     * @param {Aluguel[]} value
     */
	public set $alugueisAtivos(value: Aluguel[]) {
		this._alugueisAtivos = value;
	}

    /**
     * Getter $alugueis
     * @return {Aluguel[]}
     */
	public get $alugueis(): Aluguel[] {
		return this._alugueis;
	}

    /**
     * Setter $alugueis
     * @param {Aluguel[]} value
     */
	public set $alugueis(value: Aluguel[]) {
		this._alugueis = value;
	}

    /**
     * Getter $veiculos
     * @return {Veiculo[]}
     */
	public get $veiculos(): Veiculo[] {
		return this._veiculos;
	}

    /**
     * Setter $veiculos
     * @param {Veiculo[]} value
     */
	public set $veiculos(value: Veiculo[]) {
		this._veiculos = value;
	}

    /**
     * Função responsável pelo cadastro de clientes, ela possui uma verificação garantindo um cpf unico.
     * @param nome 
     * @param cpf 
     * @param tipoCarteira 
     * @returns 
     */
    static cadastrarCliente (nome: string, cpf: string, tipoCarteira: string) {
        const clienteNovo = new Cliente(nome, cpf, tipoCarteira);

        const clientes = Locadora.listarClientes();
        
        /**
         * verifica se existe o cpf cadastrado
         */
        const cpfExiste = clientes.some(cliente => cliente.cpf === cpf); 
        
        if (cpfExiste){
            console.log('CPF já cadastrado. Não é possível adicionar cliente.');
            return;
        } else {
            clientes.push(clienteNovo);
            try {
                const filePath = path.join(__dirname, '..', 'data', 'clientes.json');
                fs.writeFileSync(filePath, JSON.stringify(clientes));
            } catch (error) {
                console.error('Erro ao ler o arquivo JSON:', error);
            }
        }
       
    }
    /**
     * Metodo estático responsável por listar os clientes da locadora.
     * @returns 
     */
    static listarClientes(){
        try {
            const filePath = path.join(__dirname, '..', 'data', 'clientes.json');
            const content = fs.readFileSync(filePath, 'utf-8');
            const clientes = JSON.parse(content);
            return clientes;
        } catch (error) {
            console.error('Erro ao ler o arquivo JSON:', error);
            return [];
        }
    }

    /**
     * A partir do cpf (atributo único de cliente) ele pega o cliente edita e salva o json
     * @param nome 
     * @param cpf 
     * @param tipoCarteira 
     */
   static editarCliente (nome: string, cpf: string, tipoCarteira: string) {
        const clientes = Locadora.listarClientes();
         /**
         * verifica se existe o cpf cadastrado
         */
        const clienteExiste = clientes.find((cliente: Cliente) => cliente.cpf === cpf);
        if (clienteExiste) {
            clienteExiste.nome = nome;
            clienteExiste.tipoCarteira = tipoCarteira;
            // fs.writeFileSync('usuarios.json', JSON.stringify(usuarios));
            try {
                const filePath = path.join(__dirname, '..', 'data', 'clientes.json');
                fs.writeFileSync(filePath, JSON.stringify(clientes));
            } catch (error) {
                console.error('Erro ao ler o arquivo JSON:', error);
            }
        } else {
            console.log(`Usuário com CPF ${cpf} não foi encontrado.`);
        }
    }
    /**
     * A partir do cpf (atributo único de cliente) ele pega o cliente e o exclui
     * @param nome 
     * @param cpf 
     * @param tipoCarteira 
     */
   static excluirCliente (nome: string, cpf: string, tipoCarteira: string) {
        const clientes = Locadora.listarClientes();
        /**
        * verifica se existe o cpf cadastrado e retorna o index
        */
       const index = clientes.findIndex((cliente: Cliente) => cliente.cpf === cpf);
        if (index !== -1) {
            clientes.splice(index, 1); 
            try {
                const filePath = path.join(__dirname, '..', 'data', 'clientes.json');
                fs.writeFileSync(filePath, JSON.stringify(clientes));
            } catch (error) {
                console.error('Erro ao ler o arquivo JSON:', error);
            }
        } else {
            console.log(`Usuário com CPF ${cpf} não foi encontrado.`);
        }
    }

    /**
     * 
     * @param id 
     * @param dataInicio 
     * @param dataFim 
     * @param valorAluguel 
     * @param cliente 
     * @param veiculo 
     * @param estaAtivo 
     */

    cadastarAluguel (id: number, dataInicio: Date, dataFim: Date, valorAluguel: number, cliente: Cliente, veiculo: Veiculo, estaAtivo: boolean) {
        //todo
    }

    editarAluguel (id: number, dataInicio: Date, dataFim: Date, valorAluguel: number, cliente: Cliente, veiculo: Veiculo, estaAtivo: boolean) {
        //todo id unico
    }

    cadastrarVeiculo (tipo: string, marca: string, modelo: string, ano: number, placa: string, valorDiaria: number, estaDisponivel: boolean) {
        //todo
    }

    editarVeiculo (tipo: string, marca: string, modelo: string, ano: number, placa: string, valorDiaria: number, estaDisponivel: boolean) {
        //todo placa unico
    }

    listarVeiculos(){
        //todo listar todos os veiculos
    }
    listarVeiculosDisponiveis(){
        //todo listar todos os veiculos onde o estádisponivel é true
    }
    listarAlugueis(){
        //todo listar todos os alugueis
    }
    listarAlugueisAtivos(){
        //todo listar todos os alugueis onde estáativo é true.
    }
    
}
