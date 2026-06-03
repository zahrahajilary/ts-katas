import{describe,test,expect} from "vitest";
import titleCase from "./titleCase";
describe("capitalize", () => {
    test("should capitalize first letter", () => {
        expect(titleCase("hello")).toBe("Hello");
    });

    test("should capitalize first letter", () => {
        expect(titleCase("hello is a new world")).toBe("Hello Is A New World");
    });
});