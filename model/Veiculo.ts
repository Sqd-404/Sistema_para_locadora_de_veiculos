/**
 * 
 */
export class Veiculo{
    public estaDisponivel: boolean = true;
    
    constructor(
        public tipo: string,
        public marca: string,
        public modelo: string,
        public ano: number,
        public placa: string,
        public valorDiaria: number,
    ) { }
}

export default Veiculo;