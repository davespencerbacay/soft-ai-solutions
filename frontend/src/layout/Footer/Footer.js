const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white py-6 mt-10 border-t border-gray-200">
      <div className="text-center space-y-1">
        <p className="text-sm text-gray-800 font-medium">
          Dave Spencer Bacay
        </p>
        <p className="text-xs text-gray-500">
          © {year} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
