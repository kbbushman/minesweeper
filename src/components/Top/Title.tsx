import styled from '@emotion/styled';

export interface TitleProps {
  /**
   * Text inside the title
   */
  children: string;
}

export const Title = styled.h1<TitleProps>`
  font-size: 2em;
`;
