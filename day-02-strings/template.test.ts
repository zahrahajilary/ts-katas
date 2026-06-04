import { describe, it, expect } from "vitest";
import  template from './template'

describe('template', () => {
    it('should replace variables', () => {
        const result = template('Hello {{name}}', { name: 'John' })
        expect(result).toBe('Hello John')
    })
})