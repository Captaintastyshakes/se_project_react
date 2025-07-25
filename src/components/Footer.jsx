export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer__wrapper">
      <p className="footer__copyright">Developed by Michael Weihmann</p>
      <p className="footer__year">{year}</p>
    </footer>
  );
}
