import styled from 'styled-components';
import { useTranslation, Trans } from '../../config/i18next';
import Link from './Link';

const StyledFooter = styled.footer`
  width: 100%;
  text-align: center;
  height: ${(props) => props.theme.constants.footerHeight};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Footer = () => {
  const { t } = useTranslation('footer');
  return (
    <StyledFooter>
      {t('copyright')}
      <div>
        <Trans i18nKey="footer:icons">
          Icons made by
          <Link
            href="https://www.flaticon.com/authors/freepik"
            title="Freepik"
            target="_blank"
            rel="noreferrer"
          >
            Freepik
          </Link>
          <Link
            href="https://www.flaticon.com/authors/pixel-perfect"
            title="Pixel perfect"
            target="_blank"
            rel="noreferrer"
          >
            Pixel perfect
          </Link>
          <Link
            href="https://www.flaticon.com/authors/smashicons"
            title="Smashicons"
            target="_blank"
            rel="noreferrer"
          >
            Smashicons
          </Link>
          <Link href="https://www.flaticon.com/" title="Flaticon" target="_blank" rel="noreferrer">
            www.flaticon.com
          </Link>
        </Trans>
      </div>
    </StyledFooter>
  );
};

export default Footer;
