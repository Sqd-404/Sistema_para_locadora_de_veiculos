"use strict";
/**
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
class Cliente {
    constructor(nome, cpf, tipoDeCarta) {
        this._id = 0;
        this._nome = nome;
        this._cpf = cpf;
        this._tipoDeCarta = tipoDeCarta;
        Cliente.inicializarContador();
        this._id = Cliente.totalClientes;
    }
    //geters e seters//
    /**
     * Getter nome
     * @return {string}
     */
    get nome() {
        return this._nome;
    }
    /**
     * Setter nome
     * @param {string} value
     */
    set nome(value) {
        this._nome = value;
    }
    /**
     * Getter id
     * @return {number }
     */
    get id() {
        return this._id;
    }
    /**
     * Setter id
     * @param {number } value
     */
    set id(value) {
        this._id = value;
    }
    /**
     * Getter cpf
     * @return {string}
     */
    get cpf() {
        return this._cpf;
    }
    /**
     * Setter cpf
     * @param {string} value
     */
    set cpf(value) {
        this._cpf = value;
    }
    /**
     * Getter tipoDeCarta
     * @return {string}
     */
    get tipoDeCarta() {
        return this._tipoDeCarta;
    }
    /**
     * Setter tipoDeCarta
     * @param {string} value
     */
    set tipoDeCarta(value) {
        this._tipoDeCarta = value;
    }
    //métodos//
    static listar() {
        try {
            const filePath = path.join(__dirname, "..", "data", "clientes.json");
            const content = fs.readFileSync(filePath, "utf-8");
            const clientes = JSON.parse(content);
            return clientes;
        }
        catch (error) {
            console.error("Erro ao ler o arquivo JSON:", error);
            return [];
        }
    }
    static cadastrarCliente(nome, cpf, tipoDeCarta) {
        const novoCliente = new Cliente(nome, cpf, tipoDeCarta);
        const clientes = Cliente.listar();
        const cpfExiste = clientes.some((cliente) => cliente._cpf === cpf);
        if (cpfExiste) {
            console.log("CPF já cadastrado. Não é possível adicionar cliente.");
            return;
        }
        else {
            clientes.push(novoCliente);
            try {
                const filePath = path.join(__dirname, "..", "data", "clientes.json");
                fs.writeFileSync(filePath, JSON.stringify(clientes));
                console.log(`Cliente ${nome} cadastrado com sucesso!`);
            }
            catch (error) {
                console.error("Erro ao ler o arquivo JSON:", error);
            }
        }
    }
    static editarCliente(id, nome, cpf, tipoDeCarta) {
        const clientes = Cliente.listar();
        const cliente = clientes.find((cliente) => cliente._id === id);
        if (cliente) {
            cliente._nome = nome;
            cliente._cpf = cpf;
            cliente._tipoDeCarta = tipoDeCarta;
            try {
                const filePath = path.join(__dirname, "..", "data", "clientes.json");
                fs.writeFileSync(filePath, JSON.stringify(clientes));
            }
            catch (error) {
                console.error("Erro ao ler o arquivo JSON:", error);
            }
        }
        else {
            console.log(`Cliente com ${id} não foi encontrado!`);
        }
    }
    static excluirCliente(id) {
        const clientes = Cliente.listar();
        const index = clientes.findIndex((cliente) => cliente._id === id);
        if (index !== -1) {
            clientes.splice(index, 1);
            try {
                const filePath = path.join(__dirname, "..", "data", "clientes.json");
                fs.writeFileSync(filePath, JSON.stringify(clientes));
            }
            catch (error) {
                console.error("Erro ao ler o arquivo JSON:", error);
            }
        }
        else {
            console.log(`Cliente com id ${id} não encontrado!`);
        }
    }
    static recuperarCliente(id) {
        const clientes = Cliente.listar();
        const clienteEncontrado = clientes.find((cliente) => cliente._id === id);
        if (clienteEncontrado) {
            return clienteEncontrado;
        }
        else {
            console.log(`cliente com id ${id} não foi encontrado.`);
        }
    }
    static inicializarContador() {
        try {
            const filePath = path.join(__dirname, "..", "data", "clientes.json");
            const content = fs.readFileSync(filePath, "utf-8");
            const clientes = JSON.parse(content);
            let maiorId = 0;
            for (const cliente of clientes) {
                if (cliente._id > maiorId) {
                    maiorId = cliente._id;
                }
            }
            Cliente.totalClientes = maiorId + 1; // Configura o contador com o maior ID encontrado + 1
        }
        catch (error) {
            console.error("Erro ao ler o arquivo JSON de aluguéis:", error);
            // Definir o contador com valor padrão em caso de erro na leitura do arquivo
            Cliente.totalClientes = 1;
        }
    }
}
exports.default = Cliente;
