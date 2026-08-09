import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AppLayout } from './components/layout/AppLayout';
import { ProtectedRoute } from './components/routing/ProtectedRoute';
import { RoleRoute } from './components/routing/RoleRoute';
import { PublicOnlyRoute } from './components/routing/PublicOnlyRoute';

import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import VerifyEmail from './pages/auth/VerifyEmail';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

import GoodsList from './pages/goods/GoodsList';
import GoodDetail from './pages/goods/GoodDetail';
import GoodForm from './pages/goods/GoodForm';

import NeedsList from './pages/needs/NeedsList';
import NeedDetail from './pages/needs/NeedDetail';
import NeedForm from './pages/needs/NeedForm';

import MyOffers from './pages/offers/MyOffers';
import SubmitVerification from './pages/verification/SubmitVerification';
import Inbox from './pages/messages/Inbox';
import Thread from './pages/messages/Thread';

import AdminLayout from './pages/admin/AdminLayout';
import AdminUsers from './pages/admin/AdminUsers';
import AdminGoods from './pages/admin/AdminGoods';
import AdminVerifications from './pages/admin/AdminVerifications';
import AdminNeeds from './pages/admin/AdminNeeds';
import AdminOffers from './pages/admin/AdminOffers';
import AdminMessages from './pages/admin/AdminMessages';

import { ROLES } from './utils/constants';

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { fontSize: '14px', borderRadius: '10px' },
          success: { iconTheme: { primary: '#2c5638', secondary: '#fff' } },
        }}
      />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />

          {/* Public marketplace browsing */}
          <Route path="/goods" element={<GoodsList />} />
          <Route path="/goods/:publicId" element={<GoodDetail />} />
          <Route path="/needs" element={<NeedsList />} />
          <Route path="/needs/:publicId" element={<NeedDetail />} />

          {/* Public-only auth pages */}
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/auth/verify" element={<VerifyEmail />} />

          {/* Authenticated-only */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/offers" element={<MyOffers />} />
            <Route path="/verification" element={<SubmitVerification />} />
            <Route path="/messages" element={<Inbox />} />
            <Route path="/messages/:userId" element={<Thread />} />
          </Route>

          {/* Farmer-only */}
          <Route element={<RoleRoute roles={[ROLES.FARMER]} />}>
            <Route path="/goods/new" element={<GoodForm />} />
            <Route path="/goods/:publicId/edit" element={<GoodForm />} />
          </Route>

          {/* Buyer-only */}
          <Route element={<RoleRoute roles={[ROLES.BUYER]} />}>
            <Route path="/needs/new" element={<NeedForm />} />
            <Route path="/needs/:publicId/edit" element={<NeedForm />} />
          </Route>

          {/* Admin-only */}
          <Route element={<RoleRoute roles={[ROLES.ADMIN]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminUsers />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="goods" element={<AdminGoods />} />
              <Route path="needs" element={<AdminNeeds />} />
              <Route path="offers" element={<AdminOffers />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="verifications" element={<AdminVerifications />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
