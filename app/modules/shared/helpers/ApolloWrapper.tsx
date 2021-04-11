import React from 'react';

import { ApolloProvider } from '@apollo/client';

import { useApollo } from '../../../config/apolloClient';

type Props = {
  initialApolloState: unknown;
  children: React.ReactNode;
};

const ApolloWrapper = (props: Props) => {
  const { initialApolloState, children } = props;
  const apolloClient = useApollo(initialApolloState);

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
