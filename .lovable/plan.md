

# Admin Dashboard Plan for Conceev Health

## Current State

All data (doctors, packages, locations/hospitals) is hardcoded in static TypeScript files:
- `src/data/doctors.ts` — 12 doctors with detailed profiles, reviews, qualifications
- `src/data/packages.ts` — 18 packages across 3 specialties (Gynaecology, Maternity, Fertility)
- `src/components/CityCoverage.tsx` — hospitals/locations hardcoded inline

There is no authentication, no admin role, and no dynamic data layer.

## What Needs to Be Built

### 1. Database Tables (Lovable Cloud)

Migrate all static data into database tables:

- **specialties** — `id`, `name`, `slug`, `sort_order`, `created_at`
- **cities** — `id`, `name`, `slug`, `created_at`
- **locations** (hospitals) — `id`, `city_id` (FK), `name`, `area`, `surgeries` (text[]), `created_at`
- **doctors** — `id`, `slug`, `name`, `designation`, `experience`, `image_url`, `bio`, `qualifications` (text[]), `specializations` (text[]), `surgeries` (text[]), `hospitals` (text[]), `cities` (text[]), `languages` (text[]), `consultation_fee`, `created_at`
- **doctor_reviews** — `id`, `doctor_id` (FK), `name`, `area`, `rating`, `quote`, `image_url`, `created_at`
- **packages** — `id`, `slug`, `title`, `description`, `price`, `cities` (text[]), `tag`, `specialty_id` (FK), `icon_name`, `success_rate`, `total_patients`, `avg_rating`, `duration`, `recovery`, `includes` (text[]), `overview`, `created_at`
- **package_reviews** — `id`, `package_id` (FK), `name`, `city`, `rating`, `text`, `created_at`
- **user_roles** — `id`, `user_id` (FK to auth.users), `role` (enum: admin, user)

RLS policies:
- All content tables: public SELECT, admin-only INSERT/UPDATE/DELETE (using `has_role()` security definer function)
- `user_roles`: admin-only access via security definer function

### 2. Authentication

- Admin login page at `/admin/login` with email/password
- Protected admin routes using an `AdminRoute` wrapper component
- No public signup -- admin accounts created manually via database

### 3. Admin Dashboard Pages

Route structure under `/admin`:

| Route | Purpose |
|---|---|
| `/admin/login` | Admin login |
| `/admin` | Dashboard overview (counts of doctors, packages, locations) |
| `/admin/packages` | List/add/edit/delete packages |
| `/admin/doctors` | List/add/edit/delete doctors |
| `/admin/locations` | Manage cities, areas, hospitals |
| `/admin/specialties` | Manage specialties |
| `/admin/leads` | View submitted leads |

Each management page will have:
- A data table listing all records
- Add/Edit forms in modal dialogs
- Delete confirmation dialogs
- Search and filter capabilities

### 4. Frontend Data Migration

Replace all static imports with database queries:
- `src/data/packages.ts` → React Query hooks fetching from `packages` + `package_reviews` tables
- `src/data/doctors.ts` → React Query hooks fetching from `doctors` + `doctor_reviews` tables
- `CityCoverage.tsx` → fetch from `cities` + `locations` tables
- `SpecialtiesGrid.tsx` → fetch specialties from database

Create shared hooks:
- `usePackages()`, `usePackageBySlug()`
- `useDoctors()`, `useDoctorBySlug()`
- `useLocations()`, `useCities()`
- `useSpecialties()`

### 5. Admin Layout

- Sidebar navigation with links to each management section
- Header with admin name and logout button
- Responsive design using the existing Shadcn sidebar component

### 6. Image Handling

- Create a Lovable Cloud storage bucket for doctor and testimonial images
- Admin can upload images when creating/editing doctors
- Existing static images will be seeded into storage during migration

## Technical Details

### Database Migration SQL (summary)

```text
1. Create enum: app_role ('admin', 'user')
2. Create tables: specialties, cities, locations, doctors, doctor_reviews, packages, package_reviews, user_roles
3. Create has_role() security definer function
4. Enable RLS on all tables with public SELECT + admin-only write policies
5. Seed initial data from current static files
6. Create storage bucket for images
```

### New Files to Create

```text
src/hooks/useAdmin.ts          — admin auth check hook
src/hooks/usePackages.ts       — package data hooks
src/hooks/useDoctors.ts        — doctor data hooks
src/hooks/useLocations.ts      — location data hooks
src/hooks/useSpecialties.ts    — specialty data hooks
src/components/admin/AdminLayout.tsx
src/components/admin/AdminSidebar.tsx
src/components/admin/AdminRoute.tsx
src/pages/admin/AdminLogin.tsx
src/pages/admin/AdminDashboard.tsx
src/pages/admin/AdminPackages.tsx
src/pages/admin/AdminDoctors.tsx
src/pages/admin/AdminLocations.tsx
src/pages/admin/AdminSpecialties.tsx
src/pages/admin/AdminLeads.tsx
```

### Files to Modify

```text
src/App.tsx                    — add admin routes
src/components/SpecialtiesGrid.tsx  — use DB hooks
src/components/CityCoverage.tsx     — use DB hooks
src/pages/Packages.tsx              — use DB hooks
src/pages/PackageDetail.tsx         — use DB hooks
src/pages/Doctors.tsx               — use DB hooks
src/pages/DoctorProfile.tsx         — use DB hooks
```

## Implementation Order

1. Database tables + RLS + seed data
2. Data hooks (usePackages, useDoctors, etc.)
3. Update public-facing pages to use hooks instead of static data
4. Authentication + admin route protection
5. Admin layout + sidebar
6. Admin CRUD pages (packages, doctors, locations, specialties, leads)
7. Image upload via storage bucket

