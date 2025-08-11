import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                ModernStore
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Votre destination pour des produits de qualité premium. Nous nous engageons à offrir 
              la meilleure expérience d'achat en ligne avec un service client exceptionnel.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="bg-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 p-2 rounded-lg transition-all duration-300 transform hover:scale-110"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Liens Rapides</h4>
            <ul className="space-y-2">
              {['Accueil', 'Produits', 'Catégories', 'Promotions', 'Nouveautés', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Service Client</h4>
            <ul className="space-y-2">
              {[
                'Centre d\'aide',
                'Politique de retour',
                'Livraison & Expédition',
                'Guide des tailles',
                'FAQ',
                'Garantie produits'
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contactez-nous</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-gray-300">+33 1 23 45 67 89</p>
                  <p className="text-sm text-gray-400">Lun-Ven 9h-18h</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-green-600 p-2 rounded-lg">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-gray-300">contact@modernstore.fr</p>
                  <p className="text-sm text-gray-400">Réponse sous 24h</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-purple-600 p-2 rounded-lg">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-gray-300">123 Rue du Commerce</p>
                  <p className="text-sm text-gray-400">75001 Paris, France</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="text-center">
            <h4 className="text-xl font-semibold mb-4">Restez informé de nos nouveautés</h4>
            <p className="text-gray-300 mb-6">Inscrivez-vous à notre newsletter pour recevoir nos offres exclusives</p>
            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-l-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-r-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold">
                S'inscrire
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 ModernStore. Tous droits réservés. Fait avec{' '}
              <Heart className="w-4 h-4 inline text-red-500" /> en France
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Conditions d'utilisation</a>
              <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};