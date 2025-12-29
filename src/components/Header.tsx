import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMemo, useState } from 'react';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-brand-dark' : 'text-slate-700 hover:text-brand-dark'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-dark`;

export const Header = () => {
  const { user, signOut, isAdmin } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const redirectParam = useMemo(() => encodeURIComponent(location.pathname + location.search), [location]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-lg font-extrabold text-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-dark">
              Lucent
            </Link>
            <nav className="hidden md:flex items-center gap-2">
              <NavLink to="/projects" className={navLinkClass}>
                Projects
              </NavLink>
              <a className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-dark" href="/#about">
                About
              </a>
              <div className="relative group">
                <button className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-dark flex items-center gap-1">
                  Goods
                  <span aria-hidden>▾</span>
                </button>
                <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-2 min-w-[200px] border border-slate-100">
                  <NavLink to="/goods/miruru" className="block px-4 py-2 text-sm hover:bg-slate-50" onClick={() => setOpen(false)}>
                    Miruru 굿즈샵
                  </NavLink>
                  <button className="block w-full text-left px-4 py-2 text-sm text-slate-400 cursor-not-allowed">Drips (Coming Soon)</button>
                </div>
              </div>
              {isAdmin && (
                <NavLink to="/admin" className={navLinkClass}>
                  Admin
                </NavLink>
              )}
            </nav>
          </div>
          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <>
                <NavLink to={`/login?redirect=${redirectParam}`} className={navLinkClass}>
                  로그인
                </NavLink>
                <NavLink to={`/signup?redirect=${redirectParam}`} className={navLinkClass}>
                  회원가입
                </NavLink>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <NavLink to="/mypage" className={navLinkClass}>
                  마이페이지
                </NavLink>
                <button onClick={handleLogout} className="text-sm font-medium text-slate-700 hover:text-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-dark">
                  로그아웃
                </button>
              </div>
            )}
          </div>
          <div className="md:hidden">
            <button
              className="p-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-dark"
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pb-4">
          <div className="flex flex-col gap-2 pt-2">
            <NavLink to="/projects" className={navLinkClass} onClick={() => setOpen(false)}>
              Projects
            </NavLink>
            <a className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-brand-dark" href="/#about" onClick={() => setOpen(false)}>
              About
            </a>
            <NavLink to="/goods/miruru" className={navLinkClass} onClick={() => setOpen(false)}>
              Miruru 굿즈샵
            </NavLink>
            <button className="px-3 py-2 rounded-md text-sm font-medium text-slate-400 text-left" disabled>
              Drips (Coming Soon)
            </button>
            {isAdmin && (
              <NavLink to="/admin" className={navLinkClass} onClick={() => setOpen(false)}>
                Admin
              </NavLink>
            )}
            {!user ? (
              <>
                <NavLink to={`/login?redirect=${redirectParam}`} className={navLinkClass} onClick={() => setOpen(false)}>
                  로그인
                </NavLink>
                <NavLink to={`/signup?redirect=${redirectParam}`} className={navLinkClass} onClick={() => setOpen(false)}>
                  회원가입
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/mypage" className={navLinkClass} onClick={() => setOpen(false)}>
                  마이페이지
                </NavLink>
                <button onClick={handleLogout} className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-brand-dark">
                  로그아웃
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
