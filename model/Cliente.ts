/**
 * 
 */
/**
 * 
 */
import * as fs from 'fs';
import { Veiculo } from './Veiculo';
const clientes = require('./clientes.json')

export class Cliente {
    private id: number;
    private nome: string;
    private cpf: string;
    private tipoDeCarta: string;
    private veiculoAlugado: Veiculo | null; // Adicionando a propriedade veiculoAlugado

    constructor(id: number, nome: string, cpf: string, tipoDeCarta: string) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.tipoDeCarta = tipoDeCarta;
        this.veiculoAlugado = null; // Inicializando veiculoAlugado como nulo
    }

    // getters e setters omitidos para brevidade

    public get $veiculoAlugado(): Veiculo | null {
        return this.veiculoAlugado;
    }

    public set $veiculoAlugado(value: Veiculo | null) {
        this.veiculoAlugado = value;
    }


        //geters e seters//

    public get $nome(): string{
        return this.nome;
    }

    public set $nome (value: string){
        this.nome = value;
    }
    public get $cpf(): string{
        return this.cpf;
    }

    public set $cpf (value: string){
        this.cpf = value;
    }

    public get $tipoDeCarteira(): string{
        return this.tipoDeCarta;
    }

    public set $tipoDeCarteira (value: string){
        this.tipoDeCarta = value;
    }

        //métodos//

        static listar() {
            const content = fs.readFileSync('./model/clientes.json', 'utf-8');

            const clientes = JSON.parse(content);
            return clientes;
        };

       static cadastrarCliente(id:number, nome:string, cpf:string, tipoDeCarta:string){
        const cliente = new Cliente (id, nome, cpf,tipoDeCarta);
        
        const clientes = Cliente.listar();
        clientes.push(cliente);

        fs.writeFileSync('./model/clientes.json', JSON.stringify(clientes));

        };

        static editarCliente(id:number, nome:string, cpf:string, tipoDeCarta:string){
            const clientes = Cliente.listar();
            const cliente = clientes.find((cliente: Cliente) => cliente.id === id);

            if(cliente){
                cliente.nome = nome;
                cliente.cpf = cpf;
                cliente.tipoDeCarta = tipoDeCarta;

                fs.writeFileSync('./model/clientes.json', JSON.stringify(clientes));

            }else{
                console.log(`Cliente com ${id} não foi encontrado!`);
            }


        }

        static excluirCliente(id:number){
            const clientes = Cliente.listar();
            const index = clientes.findIndex((cliente: Cliente) => cliente.id === id);

            if(index !== -1){
                clientes.splice(index, 1);
                fs.writeFileSync('./model/clientes.json', JSON.stringify(clientes));
            }else{
                console.log(`Cliente com id ${id} não encontrado!`);
            }
        }


}

export default Cliente;
