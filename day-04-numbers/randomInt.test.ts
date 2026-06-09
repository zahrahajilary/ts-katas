import {describe, it, expect} from 'vitest'
import randomInt from './randomInt'

describe('randomInt', () => {
    it('returns random number', () => {
        expect(randomInt(10,20)).not.above(30)
    })
    it('returns random number2', () => {
        expect(randomInt(10,20)).not.below(10)
    })
})