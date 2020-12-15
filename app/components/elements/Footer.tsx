import { useTranslation, Trans } from "../../config/i18next";

const Footer = () => {
  const { t } = useTranslation("footer");
  return (
    <footer>
      {t("copyright")}
      <div>
        <Trans i18nKey="footer:icons">
          Icons made by
          <a
            href="https://www.flaticon.com/authors/freepik"
            title="Freepik"
            target="_blank"
          >
            Freepik
          </a>
          <a
            href="https://www.flaticon.com/authors/pixel-perfect"
            title="Pixel perfect"
            target="_blank"
          >
            Pixel perfect
          </a>
          <a
            href="https://www.flaticon.com/authors/smashicons"
            title="Smashicons"
            target="_blank"
          >
            Smashicons
          </a>
          <a href="https://www.flaticon.com/" title="Flaticon" target="_blank">
            www.flaticon.com
          </a>
        </Trans>
      </div>
    </footer>
  );
};

export default Footer;
