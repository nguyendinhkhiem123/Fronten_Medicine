export default function footer() {
  return (
    <footer className="py-6 px-16 border-t border-gray-200 font-light flex flex-col lg:flex-row justify-between items-center">
      <p className="text-gray-700 mb-6 lg:mb-0">
        Copyright &copy; {new Date().getFullYear()}{" "}
        <a
          href="https://www.facebook.com/khie.nguyen.92"
          target="_blank"
          rel="noreferrer"
          className="text-light-blue-500 hover:text-light-blue-700"
        >
          Ng D. Khiem
        </a>
      </p>

      <ul className="list-unstyled flex">
        <li className="mr-6">
          <a
            className="text-gray-700 hover:text-gray-900 font-medium block text-sm"
            target="_blank"
            rel="noreferrer"
            href="https://www.facebook.com/khie.nguyen.92"
          >
            Facebook
          </a>
        </li>
        <li className="mr-6">
          <a
            className="text-gray-700 hover:text-gray-900 font-medium block text-sm"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/nguyendinhkhiem123"
          >
            Github
          </a>
        </li>
        <li className="mr-6 text-gray-700 hover:text-gray-900 font-medium block text-sm">
            Instagram
        </li>
        <li className="text-gray-700 hover:text-gray-900 font-medium block text-sm">
            See U
        </li>
      </ul>
    </footer>
  );
}
