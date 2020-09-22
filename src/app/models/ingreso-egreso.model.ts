


export class IngresoEgreso {

    constructor(
        public descricion: string,
        public monto: number,
        public tipo: string,
        public uid?: string,
    ) {}
}