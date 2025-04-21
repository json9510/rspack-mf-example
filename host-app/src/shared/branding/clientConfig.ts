export const clients = {
    peru: {
        name: 'Peru',
        primaryColor: '#CC3F3F',
        secondaryColor: '#FFFFFF',
        logoUrl: '../assets/logos/peru.png',
    },
    enerBit: {
        name: 'enerBit',
        primaryColor: '#53358e',
        secondaryColor: '#ff7705',
        logoUrl: '../assets/logos/enerbit.png',
    },
    demo: {
        name: 'enerBit',
        primaryColor: '#DADDD8',
        secondaryColor: '#FAFAFF',
        logoUrl: '../assets/logos/free-demo.png',
    },
} as const;

export type ClientKey = keyof typeof clients;