import React, { useEffect } from 'react';

import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from '../app/components/elements/Button';
import Input from '../app/components/elements/Input';
import StyledLink from '../app/components/elements/Link';
import Text from '../app/components/elements/Text';
import SmallContentLayout from '../app/components/templates/SmallContentLayout';
import { useTranslation } from '../app/config/i18next';
import { CREATE_USER } from '../app/graphql/user';

const schema = yup.object().shape({
  name: yup.string().required('required'),
  email: yup.string().email('email invalid').required('required'),
  password: yup.string().min(6, 'minimum length#{"min": 6}').required('required'),
});

const Singup = () => {
  const router = useRouter();
  const [createUser, { data }] = useMutation(CREATE_USER);
  const { t } = useTranslation(['pagetitles', 'common', 'forms', 'button']);
  const { register, errors, handleSubmit } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (values) => {
    createUser({ variables: { ...values } });
  };

  useEffect(() => {
    if (!data || !data.createUser?.token) return;
    window.localStorage.setItem('auth', data.createUser.token);
    router.push('/');
  }, [data, router]);

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
