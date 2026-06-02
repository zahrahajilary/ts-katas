import { describe, it, expect } from "vitest";
import myUnique from "./unique";
const users = [
    {
        id: 1,
        name: "Alice",
        email: "alice@example.com"
    },
    {
        id: 2,
        name: "Bob",
        email: "bob@example.com"
    },
    {
        id: 1,
        name: "Alice",
        email: "alice@example.com" // duplicate object
    },
    {
        id: 3,
        name: "Charlie",
        email: "charlie@example.com"
    },
    {
        id: 2,
        name: "Bob",
        email: "bob@example.com" // duplicate object
    }
];

const uniqueUsers = [
    {
        id: 1,
        name: "Alice",
        email: "alice@example.com"
    },
    {
        id: 2,
        name: "Bob",
        email: "bob@example.com"
    },
    {
        id: 3,
        name: "Charlie",
        email: "charlie@example.com"
    }
];

describe("myUnique", () => {
    it("Should return an number", () => {
        expect(myUnique([1,2,3,3,4,4])).toEqual([1,2,3,4]);
    })
    it("Should return an empty array", () => {
        expect(myUnique([])).toEqual([])
    })
    it("Should return a list of nev and pos", () => {
        expect(myUnique([-1,1])).toEqual([-1,1])
    })
    it('should remove duplicates object',()=>{
        expect(myUnique(users, u => u.id)).toEqual(uniqueUsers)
    })
})