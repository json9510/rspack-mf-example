export const clients = {
	peru: {
		name: "Peru",
		primaryColor: "#E21F1B",
		secondaryColor: "#E21F1B",
		logoUrl: "../assets/logos/peru.png",
	},
	enerBit: {
		name: "enerBit",
		primaryColor: "#53358e",
		secondaryColor: "#ff7705",
		logoUrl: "../assets/logos/enerbit.png",
	},
	demo: {
		name: "demo",
		primaryColor: "#DADDD8",
		secondaryColor: "#DADDD8",
		logoUrl: "../assets/logos/free-demo.png",
	},
	pereira: {
		name: "pereira",
		primaryColor: "#FF0",
		secondaryColor: "#f00",
		logoUrl: "../assets/logos/pereira.png",
	},
} as const;

export type ClientKey = keyof typeof clients;
