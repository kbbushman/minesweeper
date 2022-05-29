import React from 'react';
import styled from '@emotion/styled';

export const Legend: React.FC = () => {
  return (
    <Parent>
      <strong>Flag: </strong>
      <CodeContainer>
        <code>
          <Key>ctrl</Key> + <Click>click</Click>
        </code>
      </CodeContainer>
    </Parent>
  );
};

const CodeContainer = styled.code`
  background: #e3e3e3;
  padding: 2px 4px;
  border-radius: 4px;
`;

const Parent = styled.legend`
  font-size: 1em;
  margin: 0 auto 2vh;
  line-height: 1.25em;
`;

const Key = styled.span`
  color: #ec433c;
`;

const Click = styled.span`
  color: #2a48ec;
`;
