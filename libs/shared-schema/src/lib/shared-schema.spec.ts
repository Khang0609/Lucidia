import { sharedSchema } from './shared-schema.js';

describe('sharedSchema', () => {
  it('should work', () => {
    expect(sharedSchema()).toEqual('shared-schema');
  });
});
