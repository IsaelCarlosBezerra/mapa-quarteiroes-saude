export class Quarteirao {
	private constructor(
		public readonly id: string,
		public readonly numero: number,
	) {
		if (!id || id.trim().length === 0) throw new Error("Id do quarteirão é obrigatório")
		if (!Number.isInteger(numero) || numero <= 0)
			throw new Error("Número do quarteirão inválido")
	}

	static criar(params: { id: string; numero: number }) {
		return new Quarteirao(params.id, params.numero)
	}
}
