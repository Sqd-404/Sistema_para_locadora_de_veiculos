import Cliente from "./Cliente";
import Aluguel from "./Aluguel";

const fs = require("fs");
const path = require("path");

class Veiculo {
	tipo: string;
	marca: string;
	modelo: string;
	ano: number;
	placa: string;
	valorDiaria: number;
	estaDisponivel: boolean;

	constructor(
		tipo: string,
		marca: string,
		modelo: string,
		ano: number,
		placa: string,
		valorDiaria: number,
		estaDisponivel: boolean
	) {
		this.tipo = tipo;
		this.marca = marca;
		this.modelo = modelo;
		this.ano = ano;
		this.placa = placa;
		this.valorDiaria = valorDiaria;
		this.estaDisponivel = estaDisponivel;
	}

    private static verificarVeiculoExistente(placa: string): boolean {
        const veiculos = Veiculo.listarVeiculos();
		return veiculos.some((veiculo) => veiculo.placa === placa);
	}

    static listarVeiculos() {
		try {
			const filePath = path.join(__dirname, "..", "data", "veiculos.json");
			const content = fs.readFileSync(filePath, "utf-8");
			const clientes = JSON.parse(content);
			return clientes;
		} catch (error) {
			console.error("Erro ao ler o arquivo JSON:", error);
			return [];
		}
	}

	static cadastrarVeiculo(
		tipo: string,
		marca: string,
		modelo: string,
		ano: number,
		placa: string,
		valorDiaria: number,
		estaDisponivel: boolean
	) {
        const veiculos = Veiculo.listarVeiculos();
		if (!Veiculo.verificarVeiculoExistente(placa)) {
			const novoVeiculo = new Veiculo(
				tipo,
				marca,
				modelo,
				ano,
				placa,
				valorDiaria,
				estaDisponivel
			);
			try {
				const filePath = path.join(__dirname, "..", "data", "veiculos.json");
				const content = fs.readFileSync(filePath, "utf-8");
				const veiculos = JSON.parse(content);
				veiculos.push(novoVeiculo);
				fs.writeFileSync(filePath, JSON.stringify(veiculos, null, 2));
			} catch (error) {
				console.error("Erro ao ler o arquivo JSON:", error);
			}
			console.log("\nVeículo cadastrado com sucesso!");
		} else {
			console.log("\nJá existe um veículo com essa placa cadastrado.");
		}
	}

	static devolverVeiculo(cpfCliente: string): void {
		const aluguelAtivo : Aluguel = Aluguel.listarAlugueisAtivos(true).find(
			(aluguel) => aluguel._cliente.cpf === cpfCliente
		);

		if (aluguelAtivo) {
			let aluguel = new Aluguel(aluguelAtivo.dataInicio, aluguelAtivo.dataFim, aluguelAtivo.cliente, aluguelAtivo.veiculo)
			console.log(aluguel)
			aluguel.finalizarAluguel();
		} else {
			console.log("Não há aluguel ativo para este cliente.");
		}
	}

	static listarVeiculosAlugados(veiculos: Veiculo[]) {
		try {
			const filePath = path.join(__dirname, "..", "data", "veiculos.json");
			const content = fs.readFileSync(filePath, "utf-8");
			const veiculos = JSON.parse(content);
			const veiculosFiltrados = veiculos.filter(
				(veiculo) => veiculo.estaDisponivel === false
			);
			console.log("\nVeículos alugados:");
			veiculosFiltrados.forEach((veiculo) => console.log(veiculo));
		} catch (error) {
			console.error("Erro ao ler o arquivo JSON:", error);
			return [];
		}
	}

	static listarVeiculosDisponiveis(veiculos: Veiculo[]) {
		try {
			const filePath = path.join(__dirname, "..", "data", "veiculos.json");
			const content = fs.readFileSync(filePath, "utf-8");
			const veiculos = JSON.parse(content);
			const veiculosFiltrados = veiculos.filter(
				(veiculo) => veiculo.estaDisponivel === true
			);
			console.log("\nVeículos disponíveis:");
			veiculosFiltrados.forEach((veiculo) => console.log(veiculo));
		} catch (error) {
			console.error("Erro ao ler o arquivo JSON:", error);
			return [];
		}
	}

	
}

export default Veiculo;
