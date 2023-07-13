export interface Delivery {
    runs: {
        total: number;
    };
}

export interface Over {
    over: number;
    deliveries: Delivery[];
}

export interface FileData {
    [key: string]: any;
    overs: Over[];
    deliveries: { [key: string]: Delivery }[];
}