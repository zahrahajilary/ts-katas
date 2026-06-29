/* it's going to check the object either is an object or not. if it's an object,
 we still need to call recursively and finish it when reach-out the end
 */
type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;