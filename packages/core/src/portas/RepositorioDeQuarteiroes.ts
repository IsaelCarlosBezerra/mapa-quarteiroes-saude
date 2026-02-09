// packages/core/src/portas/RepositorioDeQuarteiroes.ts
import { Quarteirao } from "../dominio/quarteirao/Quarteirao"

export interface RepositorioDeQuarteiroes {
	salvarMuitos(quarteiroes: Quarteirao[]): Promise<void>
}
