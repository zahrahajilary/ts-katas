import { test,describe,expect } from "vitest";
import kebabToCamel from "./kebabToCamel";

describe("kebabToCamel", () => {
    test("converts kebab-case to camelCase", () => {
        expect(kebabToCamel("hello-world")).toBe("helloWorld");
        expect(kebabToCamel("kebab-case-string")).toBe("kebabCaseString");
    });
});