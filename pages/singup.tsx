import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import useCreateAndAuthUser from '../app/auth/hooks/useCreateUser';
import { useTranslation } from '../app/shared/config/i18next';
import Button from '../app/shared/elements/Button';
import Input from '../app/shared/elements/Input';
import StyledLink from '../app/shared/elements/Link';
import Text from '../app/shared/elements/Text';
import SmallContentLayout from '../app/shared/templates/SmallContentLayout';

const schema = yup.object().shape({
  name: yup.string().required('required'),
  email: yup.string().email('email invalid').required('required'),
  password: yup.string().min(6, 'minimum length#{"min": 6}').required('required'),
});

const Singup = () => {
  const { t } = useTranslation(['pagetitles', 'common', 'forms', 'button']);
  const createAndAuthUser = useCreateAndAuthUser();
  const { register, errors, handleSubmit, reset } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (values) => {
    reset(values);
    createAndAuthUser(values);
  };

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
