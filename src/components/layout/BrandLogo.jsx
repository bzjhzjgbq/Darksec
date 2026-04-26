export default function BrandLogo({
  alt = "DarkSec logo",
  className = "",
  src = "/darksec-logo-nav.png",
}) {
  return <img src={src} alt={alt} className={`block h-full w-auto ${className}`.trim()} />;
}
