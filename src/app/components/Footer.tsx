'use client';

import { Mail, MapPin, Phone, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0C0F14] text-white mt-10 border-t border-[#1a1a1a] pt-8 pb-4">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-6">
        {/* Marca */}
        <div className="space-y-2 md:w-1/3">
          <h2 className="text-xl font-bold text-[#E5BA8D]">Puros Orquídea</h2>
          <p className="text-gray-300 text-base leading-relaxed">
            La elegancia del buen fumar. Seleccionamos puros artesanales de la más alta calidad para momentos verdaderamente memorables.
          </p>
        </div>

        {/* Contacto */}
        <div className="space-y-2 md:w-1/3">
          <h3 className="text-lg font-semibold text-[#E5BA8D]">Contacto</h3>
          <ul className="text-gray-300 text-base space-y-1">
            <li className="flex items-center gap-2">
              <Phone size={18} />
              <a href="tel:+5212285062080" className="hover:text-[#E5BA8D] transition">
                +52 1 228 506 2080
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} />
              <a href="mailto:contacto@purosorquidea.com" className="hover:text-[#E5BA8D] transition">
                contacto@purosorquidea.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={18} />
              <span>Xalapa, Veracruz, México</span>
            </li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div className="space-y-2 md:w-1/3">
          <h3 className="text-lg font-semibold text-[#E5BA8D]">Síguenos</h3>
          <div className="flex gap-6 items-center">
            <a
              href="https://wa.me/5212285052080"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E5BA8D] transition"
              aria-label="WhatsApp"
            >
              <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor">
                <path d="M16 0C7.164 0 0 7.165 0 16c0 2.824.738 5.529 2.139 7.935L0 32l8.258-2.121A15.943 15.943 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.27c-2.566 0-5.098-.688-7.298-1.99l-.523-.309-4.91 1.26 1.278-4.79-.34-.553A13.26 13.26 0 012.74 16c0-7.31 5.95-13.26 13.26-13.26S29.26 8.69 29.26 16 23.31 29.27 16 29.27zM23.45 19.6c-.321-.161-1.9-.937-2.194-1.045-.294-.107-.509-.16-.724.161-.214.321-.83 1.045-1.017 1.26-.187.214-.374.241-.695.08-.321-.161-1.356-.498-2.584-1.587-.955-.85-1.6-1.902-1.788-2.224-.187-.321-.02-.495.14-.656.144-.144.321-.374.482-.561.161-.187.214-.321.321-.535.107-.214.054-.401-.027-.562-.08-.161-.724-1.745-.991-2.39-.26-.624-.526-.539-.724-.548l-.616-.012c-.214 0-.562.08-.856.401s-1.122 1.095-1.122 2.675c0 1.579 1.147 3.103 1.307 3.318.161.214 2.26 3.444 5.48 4.83.767.33 1.365.526 1.831.674.77.245 1.47.211 2.025.128.618-.092 1.9-.777 2.168-1.527.267-.75.267-1.395.187-1.527-.08-.134-.294-.214-.616-.374z" />
              </svg>
            </a>
            <a href="#" className="hover:text-[#E5BA8D] transition" aria-label="Instagram">
              <Instagram size={26} />
            </a>
            <a href="#" className="hover:text-[#E5BA8D] transition" aria-label="Facebook">
              <Facebook size={26} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Puros Orquídea. Todos los derechos reservados.
      </div>
    </footer>
  );
}
