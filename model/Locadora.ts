import Veiculo from './Veiculo';
import Aluguel from './Aluguel';
import Cliente from './Cliente';


const fs = require('fs');
const path = require('path');

/**
 */
export class Locadora {
    constructor(
        private nome: string,
        private cnpj: string,
        private veiculos: Veiculo[],
        private alugueis: Aluguel[],
        private veiculosDisponiveis:Veiculo[],
        private alugueisAtivos: Aluguel[]
        ) {
	}



    /**
     * Getter $nome
     * @return {string}
     */
	public get $nome(): string {
		return this.nome;
	}

    /**
     * Setter $nome
     * @param {string} value
     */
	public set $nome(value: string) {
		this.nome = value;
	}

    /**
     * Getter $cnpj
     * @return {string}
     */
	public get $cnpj(): string {
		return this.cnpj;
	}

    /**
     * Setter $cnpj
     * @param {string} value
     */
	public set $cnpj(value: string) {
		this.cnpj = value;
	}

    /**
     * Getter $veiculosDisponiveis
     * @return {Veiculo[]}
     */
	public get $veiculosDisponiveis(): Veiculo[] {
		return this.veiculosDisponiveis;
	}

    /**
     * Setter $veiculosDisponiveis
     * @param {Veiculo[]} value
     */
	public set $veiculosDisponiveis(value: Veiculo[]) {
		this.veiculosDisponiveis = value;
	}

    /**
     * Getter $alugueisAtivos
     * @return {Aluguel[]}
     */
	public get $alugueisAtivos(): Aluguel[] {
		return this.alugueisAtivos;
	}

    /**
     * Setter $alugueisAtivos
     * @param {Aluguel[]} value
     */
	public set $alugueisAtivos(value: Aluguel[]) {
		this.alugueisAtivos = value;
	}

    /**
     * Getter $alugueis
     * @return {Aluguel[]}
     */
	public get $alugueis(): Aluguel[] {
		return this.alugueis;
	}

    /**
     * Setter $alugueis
     * @param {Aluguel[]} value
     */
	public set $alugueis(value: Aluguel[]) {
		this.alugueis = value;
	}

    /**
     * Getter $veiculos
     * @return {Veiculo[]}
     */
	public get $veiculos(): Veiculo[] {
		return this.veiculos;
	}

    /**
     * Setter $veiculos
     * @param {Veiculo[]} value
     */
	public set $veiculos(value: Veiculo[]) {
		this.veiculos = value;
	}

    cadastrarCliente (nome: string, cpf: string, tipoCarteira: string) {
        const cliente = new Cliente(nome, cpf, tipoCarteira);

        const clientes = Locadora.listarClientes();
        clientes.push(cliente);

        fs.writeFileSync('../data/clientes.json', JSON.stringify(clientes));
       
    }

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

    editarCliente (nome: string, cpf: string, tipoCarteira: boolean) {
        //todo cpf unico
    }

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
