import{describe,test,expect} from "vitest";
import capitalize from "./capitalize";
describe("capitalize", () => {
    test("should capitalize first letter", () => {
        expect(capitalize("hello")).toBe("Hello");
    });

    test("should capitalize first letter", () => {
        expect(capitalize("hello is a new world")).toBe("Hello Is A New World");
    });
});