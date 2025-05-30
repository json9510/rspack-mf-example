export declare const clients: {
    readonly peru: {
        readonly name: "Peru";
        readonly primaryColor: "#CC3F3F";
        readonly secondaryColor: "#FFFFFF";
        readonly logoUrl: "../assets/logos/peru.png";
    };
    readonly enerBit: {
        readonly name: "enerBit";
        readonly primaryColor: "#53358e";
        readonly secondaryColor: "#ff7705";
        readonly logoUrl: "../assets/logos/enerbit.png";
    };
    readonly demo: {
        readonly name: "enerBit";
        readonly primaryColor: "#DADDD8";
        readonly secondaryColor: "#FAFAFF";
        readonly logoUrl: "../assets/logos/free-demo.png";
    };
};
export type ClientKey = keyof typeof clients;
