import CodeBlock from '../';
import CodeBlockSrc from '../CodeBlock';

test('a CodeBlock component is exported', () => {
  expect(CodeBlock).toEqual(CodeBlockSrc);
});
