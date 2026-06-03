import { test,describe,expect } from "vitest";
import camelToKebab from "./camelToKebab";
describe("camelToKebab", () => {
    test("converts camelCase to kebab-case", () => {
        expect(camelToKebab("helloWorld")).toBe("hello-world");
        expect(camelToKebab("camelCaseString")).toBe("camel-case-string");
    });
});