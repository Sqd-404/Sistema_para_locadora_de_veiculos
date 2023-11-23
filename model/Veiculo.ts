/**
 * 
 */
export class Veiculo{
    
    constructor(
        public tipo: string,
        public marca: string,
        public modelo: string,
        public ano: number,
        public placa: string,
        public valorDiaria: number,
        public estaDisponivel: boolean
    ) { }
}

export default Veiculo;