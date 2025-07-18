import { describe, it, expect } from 'vitest'
import { transformVarString } from '../src/utils/transform'

describe('transformVarString', () => {
  it('should convert a single word to various casing formats', () => {
    expect(transformVarString('test')).toEqual(['test', 'Test', 'TEST', 'test', 'test'])
  })
})
