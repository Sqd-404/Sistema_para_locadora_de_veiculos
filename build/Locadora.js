"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Locadora = void 0;
const Veiculo_1 = require("./Veiculo");
const Aluguel_1 = require("./Aluguel");
const fs = require("fs");
const path = require("path");
/**
 */
class Locadora {
    constructor(_nome, _cnpj, _veiculos, _alugueis, _veiculosDisponiveis, _alugueisAtivos) {
        this._nome = _nome;
        this._cnpj = _cnpj;
        this._veiculos = _veiculos;
        this._alugueis = _alugueis;
        this._veiculosDisponiveis = _veiculosDisponiveis;
        this._alugueisAtivos = _alugueisAtivos;
    }
    /**
     * Getter $nome
     * @return {string}
     */
    get $nome() {
        return this._nome;
    }
    /**
     * Setter $nome
     * @param {string} value
     */
    set $nome(value) {
        this._nome = value;
    }
    /**
     * Getter $cnpj
     * @return {string}
     */
    get $cnpj() {
        return this._cnpj;
    }
    /**
     * Setter $cnpj
     * @param {string} value
     */
    set $cnpj(value) {
        this._cnpj = value;
    }
    /**
     * Getter $veiculosDisponiveis
     * @return {Veiculo[]}
     */
    get $veiculosDisponiveis() {
        return this._veiculosDisponiveis;
    }
    /**
     * Setter $veiculosDisponiveis
     * @param {Veiculo[]} value
     */
    set $veiculosDisponiveis(value) {
        this._veiculosDisponiveis = value;
    }
    /**
     * Getter $alugueisAtivos
     * @return {Aluguel[]}
     */
    get $alugueisAtivos() {
        return this._alugueisAtivos;
    }
    /**
     * Setter $alugueisAtivos
     * @param {Aluguel[]} value
     */
    set $alugueisAtivos(value) {
        this._alugueisAtivos = value;
    }
    /**
     * Getter $alugueis
     * @return {Aluguel[]}
     */
    get $alugueis() {
        return this._alugueis;
    }
    /**
     * Setter $alugueis
     * @param {Aluguel[]} value
     */
    set $alugueis(value) {
        this._alugueis = value;
    }
    /**
     * Getter $veiculos
     * @return {Veiculo[]}
     */
    get $veiculos() {
        return this._veiculos;
    }
    /**
     * Setter $veiculos
     * @param {Veiculo[]} value
     */
    set $veiculos(value) {
        this._veiculos = value;
    }
    // /**
    //  * Função responsável pelo cadastro de clientes, ela possui uma verificação garantindo um cpf unico.
    //  * @param nome
    //  * @param cpf
    //  * @param tipoCarteira
    //  * @returns
    //  */
    // static cadastrarCliente(nome: string, cpf: string, tipoCarteira: string) {
    // 	const clienteNovo = new Cliente(nome, cpf, tipoCarteira);
    // 	const clientes = Locadora.listarClientes();
    // 	/**
    // 	 * verifica se existe o cpf cadastrado
    // 	 */
    // 	const cpfExiste = clientes.some((cliente) => cliente.cpf === cpf);
    // 	if (cpfExiste) {
    // 		console.log("CPF já cadastrado. Não é possível adicionar cliente.");
    // 		return;
    // 	} else {
    // 		clientes.push(clienteNovo);
    // 		try {
    // 			const filePath = path.join(__dirname, "..", "data", "clientes.json");
    // 			fs.writeFileSync(filePath, JSON.stringify(clientes));
    // 		} catch (error) {
    // 			console.error("Erro ao ler o arquivo JSON:", error);
    // 		}
    // 	}
    // }
    // /**
    //  * Metodo estático responsável por listar os clientes da locadora.
    //  * @returns
    //  */
    // static listarClientes() {
    // 	try {
    // 		const filePath = path.join(__dirname, "..", "data", "clientes.json");
    // 		const content = fs.readFileSync(filePath, "utf-8");
    // 		const clientes = JSON.parse(content);
    // 		return clientes;
    // 	} catch (error) {
    // 		console.error("Erro ao ler o arquivo JSON:", error);
    // 		return [];
    // 	}
    // }
    // /**
    //  * A partir do cpf (atributo único de cliente) ele pega o cliente edita e salva o json
    //  * @param nome
    //  * @param cpf
    //  * @param tipoCarteira
    //  */
    // static editarCliente(nome: string, cpf: string, tipoCarteira: string) {
    // 	const clientes = Locadora.listarClientes();
    // 	/**
    // 	 * verifica se existe o cpf cadastrado
    // 	 */
    // 	const clienteExiste = clientes.find(
    // 		(cliente: Cliente) => cliente.cpf === cpf
    // 	);
    // 	if (clienteExiste) {
    // 		clienteExiste.nome = nome;
    // 		clienteExiste.tipoCarteira = tipoCarteira;
    // 		try {
    // 			const filePath = path.join(__dirname, "..", "data", "clientes.json");
    // 			fs.writeFileSync(filePath, JSON.stringify(clientes));
    // 		} catch (error) {
    // 			console.error("Erro ao ler o arquivo JSON:", error);
    // 		}
    // 	} else {
    // 		console.log(`Usuário com CPF ${cpf} não foi encontrado.`);
    // 	}
    // }
    // /**
    //  * A partir do cpf (atributo único de cliente) ele pega o cliente e o exclui
    //  * @param nome
    //  * @param cpf
    //  * @param tipoCarteira
    //  */
    // static excluirCliente(cpf: string) {
    // 	const clientes = Locadora.listarClientes();
    // 	/**
    // 	 * verifica se existe o cpf cadastrado e retorna o index
    // 	 */
    // 	const index = clientes.findIndex((cliente: Cliente) => cliente.cpf === cpf);
    // 	if (index !== -1) {
    // 		clientes.splice(index, 1);
    // 		try {
    // 			const filePath = path.join(__dirname, "..", "data", "clientes.json");
    // 			fs.writeFileSync(filePath, JSON.stringify(clientes));
    // 		} catch (error) {
    // 			console.error("Erro ao ler o arquivo JSON:", error);
    // 		}
    // 	} else {
    // 		console.log(`Usuário com CPF ${cpf} não foi encontrado.`);
    // 	}
    // }
    // static recuperarCliente(cpf: string) : Cliente | undefined  {
    // 	const clientes = Locadora.listarClientes();
    // 	const clienteEncontrado = clientes.find(
    // 		(cliente: Cliente) => cliente.cpf === cpf
    // 	);
    // 	if (clienteEncontrado !== -1) {
    // 		const { nome, cpf, tipoCarteira } =
    //         clienteEncontrado;
    // 		const cliente = new Cliente(
    //             nome,
    //             cpf,
    //             tipoCarteira
    // 		);
    //         return cliente;
    // 	} else {
    // 		console.log(`cliente com cpf ${cpf} não foi encontrado.`);
    // 		return undefined;
    // 	}
    // }
    /**
     * Função responsável pelo cadastro de veiculos, ela possui uma verificação garantindo uma placa unica.
     * @param tipo
     * @param marca
     * @param modelo
     * @param ano
     * @param placa
     * @param valorDiaria
     */
    static cadastrarVeiculo(tipo, marca, modelo, ano, placa, valorDiaria) {
        const veiculoNovo = new Veiculo_1.default(tipo, marca, modelo, ano, placa, valorDiaria);
        const veiculos = Locadora.listarVeiculos();
        /**
         * verifica se existe a placa cadastrada
         */
        const placaExiste = veiculos.some((veiculo) => veiculos.placa === placa);
        if (placaExiste) {
            console.log("Placa já cadastrada. Não é possível adicionar o veiculo.");
            return;
        }
        else {
            veiculos.push(veiculoNovo);
            try {
                const filePath = path.join(__dirname, "..", "data", "veiculos.json");
                fs.writeFileSync(filePath, JSON.stringify(veiculos));
            }
            catch (error) {
                console.error("Erro ao ler o arquivo JSON:", error);
            }
        }
    }
    /**
     * Classe responsável por editar o veiculo baseando na placa
     * @param tipo
     * @param marca
     * @param modelo
     * @param ano
     * @param placa
     * @param valorDiaria
     */
    static editarVeiculo(tipo, marca, modelo, ano, placa, valorDiaria) {
        const veiculos = Locadora.listarVeiculos();
        /**
         * verifica se existe a placa cadastrada
         */
        const veiculoExiste = veiculos.find((veiculo) => veiculo.placa === placa);
        if (veiculoExiste) {
            veiculoExiste.tipo = tipo;
            veiculoExiste.marca = marca;
            veiculoExiste.modelo = modelo;
            veiculoExiste.ano = ano;
            veiculoExiste.valorDiaria = valorDiaria;
            try {
                const filePath = path.join(__dirname, "..", "data", "veiculos.json");
                fs.writeFileSync(filePath, JSON.stringify(veiculos));
            }
            catch (error) {
                console.error("Erro ao ler o arquivo JSON:", error);
            }
        }
        else {
            console.log(`Veiculo com placa ${placa} não foi encontrado.`);
        }
    }
    static recuperarVeiculo(placa) {
        const veiculos = Locadora.listarVeiculos();
        const veiculoEncontrado = veiculos.find((veiculo) => veiculo.placa === placa);
        if (veiculoEncontrado) {
            return veiculoEncontrado;
        }
        else {
            console.log(`Veiculo com placa ${placa} não foi encontrado.`);
            return null;
        }
    }
    /**
     * Classe responsável por excluir o veiculo baseando na placa
     * @param tipo
     * @param marca
     * @param modelo
     * @param ano
     * @param placa
     * @param valorDiaria
     */
    static excluirVeiculo(placa) {
        const veiculos = Locadora.listarVeiculos();
        /**
         * verifica se existe a placa cadastrada
         */
        const index = veiculos.findIndex((veiculo) => veiculo.placa === placa);
        if (index !== -1) {
            veiculos.splice(index, 1);
            try {
                const filePath = path.join(__dirname, "..", "data", "veiculos.json");
                fs.writeFileSync(filePath, JSON.stringify(veiculos));
            }
            catch (error) {
                console.error("Erro ao ler o arquivo JSON:", error);
            }
        }
        else {
            console.log(`Veiculo com placa ${placa} não foi encontrado.`);
        }
    }
    /**
     * Metodo estático responsável por listar os veiculos da locadora.
     * @returns
     */
    static listarVeiculos() {
        try {
            const filePath = path.join(__dirname, "..", "data", "veiculos.json");
            const content = fs.readFileSync(filePath, "utf-8");
            const clientes = JSON.parse(content);
            return clientes;
        }
        catch (error) {
            console.error("Erro ao ler o arquivo JSON:", error);
            return [];
        }
    }
    static listarVeiculosDisponiveis() {
        try {
            const filePath = path.join(__dirname, "..", "data", "veiculos.json");
            const content = fs.readFileSync(filePath, "utf-8");
            const veiculos = JSON.parse(content);
            const veiculosFiltrados = veiculos.filter((veiculo) => veiculo.estaDisponivel === true);
            return veiculosFiltrados;
        }
        catch (error) {
            console.error("Erro ao ler o arquivo JSON:", error);
            return [];
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
    static cadastarAluguel(dataInicio, dataFim, cliente, veiculo) {
        const novoAluguel = new Aluguel_1.default(dataInicio, dataFim, cliente, veiculo);
        const alugueis = Aluguel_1.default.listarAlugueis();
        const alugueisAtivos = Aluguel_1.default.listarAlugueisAtivos();
        //necessario corrigir logica do cliente id e adicionar filtro por tipo de carta.
        // const clienteAtivo = alugueisAtivos.some(
        // 	(aluguel) => aluguel._cliente.id === cliente.id
        // );
        const carroAtivo = alugueisAtivos.some((aluguel) => aluguel._veiculo.placa === veiculo.placa);
        if (clienteAtivo) {
            console.log("O cliente já possui um aluguel ativo. Não é possível adicionar o aluguel.");
            return;
        }
        else if (carroAtivo) {
            console.log("O carro já possui um aluguel ativo. Não é possível adicionar o aluguel.");
            return;
        }
        else {
            alugueis.push(novoAluguel);
            try {
                const filePath = path.join(__dirname, "..", "data", "alugueis.json");
                fs.writeFileSync(filePath, JSON.stringify(alugueis));
            }
            catch (error) {
                console.error("Erro ao ler o arquivo JSON:", error);
            }
        }
    }
    editarAluguel(dataInicio, dataFim, cliente, veiculo) {
        //todo id unico
    }
}
exports.Locadora = Locadora;
