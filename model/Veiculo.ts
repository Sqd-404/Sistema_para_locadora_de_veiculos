import Cliente from "./Cliente";
import Aluguel from "./Aluguel";

class Veiculo {
    tipo: string;
    marca: string;
    modelo: string;
    ano: number;
    placa: string;
    valorDiaria: number;
    estaDisponivel: boolean;


    constructor(tipo: string, marca: string, modelo: string, ano: number, placa: string, valorDiaria: number, estaDisponivel:boolean) {
        this.tipo = tipo;
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.placa = placa;
        this.valorDiaria = valorDiaria;
        this.estaDisponivel = false;
    }

    cadastrarVeiculo(veiculos: Veiculo[], tipo: string, marca: string, modelo: string, ano: number, placa: string, valorDiaria: number, estaDisponivel: boolean) {
        if (!this.veiculoExistente(veiculos, placa)) {
            const novoVeiculo = new Veiculo(tipo, marca, modelo, ano, placa, valorDiaria, estaDisponivel);
            veiculos.push(novoVeiculo);
            console.log('Veículo cadastrado com sucesso!');
        } else {
            console.log('Já existe um veículo com essa placa cadastrado.');
        }
    }

    devolverVeiculo(cpfCliente: string): void {
        const aluguelAtivo = Aluguel.listarAlugueisAtivos().find(
            (aluguel) => aluguel._cliente.cpf === cpfCliente
        );

        if (aluguelAtivo) {
            aluguelAtivo.atualizarStatus();

            if (aluguelAtivo._estaAtivo) {
                console.log('Veículo devolvido dentro do prazo.');
            } else {
                console.log('Veículo devolvido após a data de devolução.');
            }

            console.log('Veículo devolvido com sucesso.');
        } else {
            console.log('Não há aluguel ativo para este cliente.');
        }
    }

    static listarVeiculosAlugados(veiculos: Veiculo[]) {
        const veiculosAlugados = veiculos.filter((veiculo) => !veiculo.estaDisponivel);
        console.log('Veículos alugados:');
        veiculosAlugados.forEach((veiculo) => console.log(veiculo.placa));
    }

    private veiculoExistente(veiculos: Veiculo[], placa: string): boolean {
        return veiculos.some((veiculo) => veiculo.placa === placa);
    }
}

export default Veiculo;