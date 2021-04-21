import React, { useCallback, useEffect } from 'react';

import { useApolloClient, useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { LOGIN } from '../app/auth/graphql/user';
import useAuthToken from '../app/auth/hooks/useAuthToken';
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
  const router = useRouter();
  const client = useApolloClient();
  const { saveToken } = useAuthToken();
  const { t } = useTranslation(['pagetitles', 'common', 'forms']);
  const [login, { data }] = useMutation(LOGIN, {
    onError: () => {
      toast.error(t('common:errors.something_went_wrong'));
    },
  });
  const { register, errors, handleSubmit, reset } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (values) => {
    reset(values);
    login({ variables: { ...values } });
  };

  const authUser = useCallback(
    (token) => {
      saveToken(token);
      client.cache.reset().then(() => {
        router.push('/');
      });
    },
    [client.cache, router, saveToken]
  );

  useEffect(() => {
    if (!data || !data.login) return;
    if (data.login.__typename === 'Authorized') {
      authUser(data.login.token);
      return;
    }
    if (data.login.__typename === 'Unauthorized') {
      toast.error(t(`common:errors.${data.login.reason}`));
    }
  }, [authUser, data, t]);

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
