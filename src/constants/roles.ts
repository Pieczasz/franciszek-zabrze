export const ROLES = {
	ADMIN: 'admin',
	MODERATOR: 'moderator',
	MINISTRANT: 'ministrant',
	DZIECKOMARYI: 'dzieckomaryi',
	CHOR: 'chor',
	CARITAS: 'caritas',
	OAZA: 'oaza',
	FRANCISZKANSKIZAKON: 'franciszkanskizakon',
	KARMELITANSKIZAKON: 'karmelitanskizakon',
	DUSZPASTERZE: 'duszpasterze',
	ROZANCOWEDZIELO: 'rozancowedzielo',
	ROZEROZANCOWE: 'rozerozancowe',
	WSPOLNOTAZMARTWYCHWSTANIA: 'wspolnotazmartwychwstania',
	POSLUGADUSZPASTERSKA: 'poslugaduszpasterska',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
