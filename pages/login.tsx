import React from 'react';
import SmallContentLayout from '../app/components/templates/SmallContentLayout';
import { useTranslation } from '../app/config/i18next';

const Login = () => {
  const { t } = useTranslation(['pagetitles', 'common']);
  return (
    <SmallContentLayout title={t('pagetitles:login')} pageName={t('common:login')}>
      login
    </SmallContentLayout>
  );
};

export default Login;
