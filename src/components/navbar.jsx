import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-20">
          {/* Izquierda: Título */}
          <div className="flex items-center z-10">
            <h1 className="text-2xl font-bold text-gray-900">
              AnatomAR EduTech
            </h1>
          </div>

          {/* Derecha: Menú */}
          <div className="hidden md:flex items-center space-x-4 z-10">
            <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-md font-medium transition-colors">
              Inicio
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-md font-medium transition-colors">
              Modelos
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-md font-medium transition-colors">
              Contacto
            </a>
          </div>

          {/* Centro: Logo SVG */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img
              src="/anatom.svg"
              alt="Logo"
              className="w-12 h-12"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
