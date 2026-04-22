import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/store/authStore";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy page imports
const OnboardingPage = lazy(() => import("@/pages/OnboardingPage"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));
const BookingsPage = lazy(() => import("@/pages/BookingsPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const StudentDashboardPage = lazy(() => import("@/pages/StudentDashboardPage"));
const DriverDashboardPage = lazy(() => import("@/pages/DriverDashboardPage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));
const BookingDetailPage = lazy(() => import("@/pages/BookingDetailPage"));

function PageFallback() {
  return (
    <div className="p-4 space-y-3">
      <Skeleton className="h-32 w-full rounded-2xl" />
      <Skeleton className="h-20 w-full rounded-2xl" />
      <Skeleton className="h-20 w-full rounded-2xl" />
    </div>
  );
}

function requireAuth() {
  const state = useAuthStore.getState();
  if (!state.isAuthenticated || !state.userRole) {
    throw redirect({ to: "/" });
  }
}

const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <OnboardingPage />
    </Suspense>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/home",
  beforeLoad: requireAuth,
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <HomePage />
    </Suspense>
  ),
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  beforeLoad: requireAuth,
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <SearchPage />
    </Suspense>
  ),
});

const bookingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bookings",
  beforeLoad: requireAuth,
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <BookingsPage />
    </Suspense>
  ),
});

const bookingDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/booking/$id",
  beforeLoad: requireAuth,
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <BookingDetailPage />
    </Suspense>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  beforeLoad: requireAuth,
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ProfilePage />
    </Suspense>
  ),
});

const studentDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/student/dashboard",
  beforeLoad: requireAuth,
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <StudentDashboardPage />
    </Suspense>
  ),
});

const driverDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/driver/dashboard",
  beforeLoad: requireAuth,
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <DriverDashboardPage />
    </Suspense>
  ),
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  beforeLoad: requireAuth,
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <SettingsPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  homeRoute,
  searchRoute,
  bookingsRoute,
  bookingDetailRoute,
  profileRoute,
  studentDashboardRoute,
  driverDashboardRoute,
  settingsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
