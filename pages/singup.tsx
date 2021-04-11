import React, { useCallback, useEffect } from 'react';

import { useApolloClient, useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import Button from '../app/components/elements/Button';
import Input from '../app/components/elements/Input';
import StyledLink from '../app/components/elements/Link';
import Text from '../app/components/elements/Text';
import SmallContentLayout from '../app/components/templates/SmallContentLayout';
import { useTranslation } from '../app/config/i18next';
import { CREATE_USER } from '../app/graphql/user';
import useAuthToken from '../app/modules/auth/useAuthToken';

const schema = yup.object().shape({
  name: yup.string().required('required'),
  email: yup.string().email('email invalid').required('required'),
  password: yup.string().min(6, 'minimum length#{"min": 6}').required('required'),
});

const Singup = () => {
  const router = useRouter();
  const client = useApolloClient();
  const { saveToken } = useAuthToken();
  const { t } = useTranslation(['pagetitles', 'common', 'forms', 'button']);
  const [createUser, { data }] = useMutation(CREATE_USER, {
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
    createUser({ variables: { ...values } });
  };

  const authUser = useCallback(
    (token) => {
      saveToken(token);
      toast.success(t('common:user created'));
      client.cache.reset().then(() => {
        router.push('/');
      });
    },
    [client.cache, router, saveToken, t]
  );

  useEffect(() => {
    if (!data || !data.createUser) return;
    if (data.createUser.__typename === 'Authorized') {
      authUser(data.createUser.token);
      return;
    }
    if (data.createUser.__typename === 'Unauthorized') {
      toast.error(t(`common:errors.${data.createUser.reason}`));
    }
  }, [authUser, data, t]);

  return (
    <SmallContentLayout title={t('pagetitles:register')} pageName={t('common:register')}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Input
          name="name"
          type="name"
          ref={register}
          error={errors.name?.message}
          placeholder={t('forms:placeholder.name')}
        />
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
          {t('button:register')}
        </Button>
        <Text center small>
          {t('common:or')}
        </Text>
        <Text center>
          <Link href="/login">
            <StyledLink>{t('common:go to login')}</StyledLink>
          </Link>
        </Text>
      </form>
    </SmallContentLayout>
  );
};

export default Singup;
