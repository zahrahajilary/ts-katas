for narrowing is better use the type gurad pattern 
instead of returning error.
2. Type guard — what `isString` conventionally means
function isString(x: unknown): x is string {
return typeof x === 'string';
}
typeGuard is going to check in runtime