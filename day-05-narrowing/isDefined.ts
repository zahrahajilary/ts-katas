export default function isDefined<T>(x:undefined|T|null): x is T {
    return x != null;
}