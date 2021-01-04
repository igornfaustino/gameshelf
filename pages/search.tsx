import React from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '../app/components/templates/DashboardLayout';

const Search = (props) => {
  const router = useRouter();

  return (
    <DashboardLayout>
      <h1>search {router.query.q}</h1>
    </DashboardLayout>
  );
};

export default Search;
