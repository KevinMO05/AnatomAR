import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Izquierda: Título */}
          <div className="flex items-center z-10">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              <span className="hidden sm:inline">AnatomAR EduTech</span>
              <span className="sm:hidden">AnatomAR</span>
            </h1>
          </div>

          {/* Centro: Logo SVG - Solo visible en desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <img src="/anatom.svg" alt="Logo" className="w-12 h-12" />
          </div>

          {/* Derecha: Menú Desktop */}
          <div className="hidden md:flex items-center space-x-4 z-10">
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Inicio
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Modelos
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Contacto
            </a>
          </div>

          {/* Botón hamburguesa - Solo móvil */}
          <div className="md:hidden z-10">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Logo en menú móvil */}
              <div className="flex justify-center py-4">
                <img src="/anatom.svg" alt="Logo" className="w-12 h-12" />
              </div>

              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Modelos
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
