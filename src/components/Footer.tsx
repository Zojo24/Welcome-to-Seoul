export default function Footer() {
  const thisYear = new Date().getFullYear();
  return (
    <footer>
      <div>&copy; {thisYear} Welcome to Seoul! All Rights Reserved by Zojo</div>
      <div>
        Github:{" "}
        <a
          href="https://github.com/Zojo24"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Zojo's Github
        </a>
      </div>
    </footer>
  );
}
