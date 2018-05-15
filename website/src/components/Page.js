import styled from 'react-emotion';

const containerWidth = {
  small: '480px',
  medium: '640px',
  large: '980px',
};

const Page = styled('main') `
  max-width: ${p =>
    containerWidth[p.width] ? containerWidth[p.width] : containerWidth.medium};
  margin: 2rem auto;
  padding: 0 2rem;
`;

export default Page;
