import { Veiculo } from "./veiculo";
import { Aluguel } from './Aluguel';
import { Cliente } from "./Cliente";

/**
 */
class Locadora {
    private nome: String;
    private cnpj: String;
    private veiculos: Veiculo[];    
    private alugueis: Aluguel[];
    private veiculosDisponiveis:Veiculo[];
    private alugueisAtivos: Aluguel[];


    /**
     * Getter $nome
     * @return {String}
     */
	public get $nome(): String {
		return this.nome;
	}

    /**
     * Setter $nome
     * @param {String} value
     */
	public set $nome(value: String) {
		this.nome = value;
	}

    /**
     * Getter $cnpj
     * @return {String}
     */
	public get $cnpj(): String {
		return this.cnpj;
	}

    /**
     * Setter $cnpj
     * @param {String} value
     */
	public set $cnpj(value: String) {
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


	constructor() {
	}

    cadastrarCliente (nome: String, cpf: String, tipoCarteira: boolean) {
        //todo
    }

    editarCliente (nome: String, cpf: String, tipoCarteira: boolean) {
        //todo cpf unico
    }

    cadastarAluguel (id: number, dataInicio: Date, dataFim: Date, valorAluguel: number, cliente: Cliente, veiculo: Veiculo, estaAtivo: boolean) {
        //todo
    }

    editarAluguel (id: number, dataInicio: Date, dataFim: Date, valorAluguel: number, cliente: Cliente, veiculo: Veiculo, estaAtivo: boolean) {
        //todo id unico
    }

    cadastrarVeiculo (tipo: String, marca: String, modelo: String, ano: number, placa: String, valorDiaria: number, estaDisponivel: boolean) {
        //todo
    }

    editarVeiculo (tipo: String, marca: String, modelo: String, ano: number, placa: String, valorDiaria: number, estaDisponivel: boolean) {
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
