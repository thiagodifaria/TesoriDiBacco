
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { APP_NAME, NAVIGATION_LINKS } from '../constants';
import { RoutePath } from '../types'; 
import WineGlassIcon from './icons/WineGlassIcon';
import { useAuth } from '../App'; 
import Button from './Button';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const auth = useAuth();
  const location = useLocation();
  const isHome = location.pathname === RoutePath.Home;
  const mobileItemClass = isHome
    ? 'text-white/85 hover:bg-white/10 hover:text-white'
    : 'text-charcoal-gray hover:bg-light-warm-grey hover:text-burgundy-accent';
  const mobileActiveItemClass = isHome
    ? 'bg-white/10 !text-white font-semibold'
    : 'bg-light-warm-grey text-burgundy-accent font-semibold';

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`z-40 font-sans transition-colors duration-300 ${isHome ? 'absolute inset-x-0 top-0 bg-transparent text-white' : 'relative border-b border-gray-200/70 bg-ice-white text-charcoal-gray'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[4.5rem] items-center justify-between md:h-20">
          <Link to="/" className={`group flex items-center transition-colors duration-300 ${isHome ? 'text-white hover:text-white/80' : 'text-charcoal-gray hover:text-burgundy-accent'}`}>
            <WineGlassIcon className={`mr-2.5 h-8 w-8 transition-colors md:h-9 md:w-9 ${isHome ? 'text-gold-accent' : 'text-burgundy-accent'}`} />
            <span className="font-serif text-2xl font-semibold tracking-tight md:text-[1.7rem]">{APP_NAME}</span>
          </Link>

          <nav className="hidden items-center space-x-5 lg:flex xl:space-x-7">
            {NAVIGATION_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `border-b pb-1.5 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] transition-colors
                   ${isHome ? 'text-white/80 hover:text-white' : 'text-charcoal-gray hover:text-burgundy-accent'}
                   ${isActive ? (isHome ? 'border-gold-accent !text-white' : 'border-gold-accent text-burgundy-accent') : 'border-transparent'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-3">
            {auth?.isLoggedIn ? (
              <>
                <Button to={RoutePath.MembersArea} variant="outline" size="sm" className={isHome ? '!rounded-full !border-white/70 !text-white hover:!bg-white hover:!text-charcoal-gray' : ''}>Minha Conta</Button>
                <Button onClick={auth.logout} variant="text" size="sm" className={isHome ? '!text-white hover:!text-white/75' : '!text-charcoal-gray hover:!text-burgundy-accent'}>Logout</Button>
              </>
            ) : (
              <>
                {isHome ? (
                  <>
                    <Button to={RoutePath.Login} variant="text" size="sm" className="!text-white hover:!text-white/75 !no-underline hover:!no-underline">
                      Login
                    </Button>
                    <Button to={RoutePath.SignUp} variant="outline" size="sm" className="!rounded-full !border-white/70 !text-white hover:!bg-white hover:!text-charcoal-gray">
                      Inscrever-se
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="rounded-md bg-light-warm-grey p-px hover:bg-gray-300">
                      <Button to={RoutePath.Login} variant="primary" size="sm">Login</Button>
                    </div>
                    <Button to={RoutePath.SignUp} variant="outline" size="sm">Inscrever-se</Button>
                  </>
                )}
              </>
            )}
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`-mr-2 rounded-full p-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${isHome ? 'text-white hover:bg-white/10 hover:text-white focus-visible:outline-white' : 'text-charcoal-gray hover:bg-light-warm-grey hover:text-burgundy-accent focus-visible:outline-burgundy-accent'}`}
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-navigation" className={`absolute left-0 right-0 top-full z-30 border-t pb-4 shadow-xl backdrop-blur-md lg:hidden ${isHome ? 'border-white/15 bg-charcoal-gray/95 text-white' : 'border-light-warm-grey bg-ice-white text-charcoal-gray'}`}>
          <nav className="flex flex-col space-y-1 px-4 pt-3">
            {NAVIGATION_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2.5 text-base font-medium transition-colors ${mobileItemClass}
                   ${isActive ? mobileActiveItemClass : ''}`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className={`mt-4 space-y-2 border-t pt-4 ${isHome ? 'border-white/15' : 'border-gray-200'}`}>
              {auth?.isLoggedIn ? (
                <>
                  <NavLink
                    to={RoutePath.MembersArea}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-md px-3 py-2.5 text-base font-medium transition-colors ${mobileItemClass}
                       ${isActive ? mobileActiveItemClass : ''}`
                    }
                  >
                    Minha Conta
                  </NavLink>
                  <button
                    onClick={() => { auth.logout(); setIsMobileMenuOpen(false); }}
                    className={`block w-full rounded-md px-3 py-2.5 text-left text-base font-medium transition-colors ${mobileItemClass}`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to={RoutePath.Login}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-md px-3 py-2.5 text-base font-medium transition-colors ${mobileItemClass}
                       ${isActive ? mobileActiveItemClass : ''}`
                    }
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to={RoutePath.SignUp}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-md px-3 py-2.5 text-base font-medium transition-colors ${mobileItemClass}
                       ${isActive ? mobileActiveItemClass : ''}`
                    }
                  >
                    Inscrever-se
                  </NavLink>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
