import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import useLogin from '../app/auth/hooks/useLogin';
import { useTranslation } from '../app/shared/config/i18next';
import Button from '../app/shared/elements/Button';
import Input from '../app/shared/elements/Input';
import StyledLink from '../app/shared/elements/Link';
import Text from '../app/shared/elements/Text';
import SmallContentLayout from '../app/shared/templates/SmallContentLayout';

const schema = yup.object().shape({
  email: yup.string().email('email invalid').required('required'),
  password: yup.string().min(6, 'minimum length#{"min": 6}').required('required'),
});

const Login = () => {
  const { t } = useTranslation(['pagetitles', 'common', 'forms']);
  const { login } = useLogin();
  const { register, errors, handleSubmit, reset } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (values) => {
    reset(values);
    login(values);
  };

  return (
    <SmallContentLayout title={t('pagetitles:login')} pageName={t('common:login')}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Input
          name="email"
          type="email"
          ref={register}
          error={errors.email?.message}
          placeholder={t('forms:placeholder.email')}
        />
        <Input
          name="password"
          type="password"
          ref={register}
          error={errors.password?.message}
          placeholder={t('forms:placeholder.password')}
        />
        <Button type="submit" block textVariant="light">
          {t('common:login')}
        </Button>
        <Text center small>
          {t('common:or')}
        </Text>
        <Text center>
          <Link href="/singup">
            <StyledLink>{t('common:not registered')}</StyledLink>
          </Link>
        </Text>
      </form>
    </SmallContentLayout>
  );
};

export default Login;
