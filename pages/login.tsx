import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../app/components/elements/Button';
import Input from '../app/components/elements/Input';
import SmallContentLayout from '../app/components/templates/SmallContentLayout';
import { useTranslation } from '../app/config/i18next';

const schema = yup.object().shape({
  email: yup.string().email('email invalid').required('required'),
  password: yup.string().min(6, 'minimum length#{"min": 6}').required('required'),
});

const Login = () => {
  const { t } = useTranslation(['pagetitles', 'common', 'forms']);
  const { register, errors, handleSubmit } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  return (
    <SmallContentLayout title={t('pagetitles:login')} pageName={t('common:login')}>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
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
      </form>
    </SmallContentLayout>
  );
};

export default Login;
