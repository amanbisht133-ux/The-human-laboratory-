import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

const CaliLab = lazy(() => import('./pages/CaliLab'));
const KidsCalisthenics = lazy(() => import('./pages/KidsCalisthenics'));
const PersonalTraining = lazy(() => import('./pages/PersonalTraining'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const GoaRetreat = lazy(() => import('./pages/GoaRetreat'));
const YogLab = lazy(() => import('./pages/YogLab'));
const NotFound = lazy(() => import('./pages/NotFound'));

/** Route table shared by the browser entry (main.tsx) and the build-time prerender (entry-server.tsx). */
export default function AppRoutes() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CaliLab />} />
          <Route path="kids-calisthenics" element={<KidsCalisthenics />} />
          <Route path="personal-training" element={<PersonalTraining />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="goa-retreat" element={<GoaRetreat />} />
          <Route path="yog-lab" element={<YogLab />} />
          {/* Old page, merged into the home page (Vercel also 301s it) */}
          <Route path="calisthenics-lab" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
