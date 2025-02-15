// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getValue(obj: any, key: string) {
    if (!key || !obj) {
        return undefined;
    }
    const keys = key.split('.');
    let value = obj;
    for (const k of keys) {
        if (Array.isArray(value)) {
            value = value[parseInt(k, 10)];
        } else if (value) {
            value = value[k];
        } else {
            return undefined;
        }
    }
    return value;
}

export const normalizeArray = <T extends object>(array: T[],key: keyof T = "id" as keyof T): {[key : string]: T} => {
    return array.reduce((acc : {[key : string]: T},item : T) => {
        acc[String(item[key])] = item;
        return acc;
    },{})
} 