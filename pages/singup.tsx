import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../app/components/elements/Button';
import Input from '../app/components/elements/Input';
import SmallContentLayout from '../app/components/templates/SmallContentLayout';
import { useTranslation } from '../app/config/i18next';
import Text from '../app/components/elements/Text';
import StyledLink from '../app/components/elements/Link';

const schema = yup.object().shape({
  name: yup.string().required('required'),
  email: yup.string().email('email invalid').required('required'),
  password: yup.string().min(6, 'minimum length#{"min": 6}').required('required'),
});

const Singup = () => {
  const { t } = useTranslation(['pagetitles', 'common', 'forms', 'button']);
  const { register, errors, handleSubmit } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  return (
    <SmallContentLayout title={t('pagetitles:register')} pageName={t('common:register')}>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
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
