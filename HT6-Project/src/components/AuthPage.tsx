import { Link } from 'react-router-dom';
import authBg from '../assets/bg3.jpg';



type AuthPageProps = {
  title: string;
  logoSrc?: string;
  logoWidth?: number;
  buttonSrc?: string;
  primaryActionLabel: string;
  primaryAction: () => void;
  alternateTo: string;
  alternateActionLabel: string;
};

export function AuthPage({
  title,
  logoSrc,
  logoWidth = 800,
  buttonSrc,
  primaryActionLabel,
  primaryAction,
  alternateTo,
  alternateActionLabel,
}: AuthPageProps) {
  return (
    <div className="auth-scene">
      {logoSrc ? (
        <img
          src={logoSrc}
          alt={title}
          className="auth-logo"
          style={{ width: `${logoWidth}px` }}
        />
      ) : (
        <h1 className="pixel-title">{title}</h1>
      )}

      <button className="auth-button" onClick={primaryAction} type="button">
        {buttonSrc ? (
          <img src={buttonSrc} alt={primaryActionLabel} className="auth-button-img" />
        ) : (
          primaryActionLabel
        )}
      </button>
    </div>
  );
}
