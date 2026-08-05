# AKTech Sales CRM

A premium internal sales CRM built with **Next.js 15+**, **TypeScript**, **Tailwind CSS**, **Shadcn UI**, and **Firebase** (Authentication, Firestore, Storage). It provides role‑based access for **admin** and **sales** users, real‑time lead management, bulk lead import, commission tracking, and an activity audit log.

---

## Tech Stack
- **Framework**: Next.js (App Router) 15+
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI components
- **Auth & DB**: Firebase Authentication, Cloud Firestore, Firebase Storage
- **Forms & Validation**: React Hook Form + Zod
- **Tables & Charts**: TanStack Table, Recharts
- **Icons**: Lucide Icons

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/your-org/aktech-leads-crm.git
cd aktech-leads-crm

# Install dependencies
npm install   # or yarn, pnpm, bun

# Set up Firebase env vars (copy .env.example → .env.local)
cp .env.example .env.local
# Fill in your Firebase project credentials

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app. The root page redirects to `/dashboard` if you are logged in, otherwise to `/login`.

---

## Deployment (Vercel) 
1. Push the repository to GitHub.
2. In the Vercel dashboard, import the repo and select **Next.js** as the framework.
3. Add the same environment variables from `.env.local` to Vercel (Firebase config, `NEXT_PUBLIC_FIREBASE_*`).
4. Deploy – Vercel will run `npm run build` automatically. No additional server configuration is required because all backend logic runs as Next.js API routes using the Firebase Admin SDK.

> **Tip:** Enable the **preview branches** feature to get a live preview for each PR.

---

## Firestore Security Rules
Create a file named `firestore.rules` at the project root and enable it via the Firebase CLI (`firebase deploy --only firestore:rules`). The rules enforce role‑based access and protect sensitive fields.

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection – only admins can create/update/delete, users can read their own profile
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow create, update, delete: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Leads collection – admins can read/write all, sales can only read/write leads assigned to them
    match /leads/{leadId} {
      allow read: if isAdmin() || (isSales() && resource.data.assignedTo == request.auth.uid);
      allow create, update, delete: if isAdmin() || (isSales() && request.resource.data.assignedTo == request.auth.uid);
    }

    // Commissions – only admins can read/write, sales can read their own commissions via a sub‑collection
    match /commissions/{commissionId} {
      allow read, write: if isAdmin();
    }
    match /users/{uid}/commissions/{cid} {
      allow read: if request.auth != null && request.auth.uid == uid;
    }

    // Activity Log – readable by admins, writable by any authenticated user
    match /activityLog/{logId} {
      allow read: if isAdmin();
      allow create: if request.auth != null;
    }

    function isAdmin() {
      return request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    function isSales() {
      return request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'sales';
    }
  }
}
```

---

## Testing
The project uses **Jest** for unit tests and **React Testing Library** for component tests.

### Running Tests
```bash
npm test            # runs jest in watch mode
npm run test:ci    # one‑off run for CI pipelines
```

### Example Unit Test (commissions.service)
Create `__tests__/commissions.service.test.ts`:
```ts
import { commissionsService } from '@/services/commissions.service';
import { db } from '@/firebase/config';
import { writeBatch, serverTimestamp, doc } from 'firebase/firestore';

jest.mock('firebase/firestore', () => {
  const original = jest.requireActual('firebase/firestore');
  return {
    ...original,
    writeBatch: jest.fn(() => ({
      update: jest.fn(),
      set: jest.fn(),
      commit: jest.fn().mockResolvedValue(undefined),
    })),
    serverTimestamp: jest.fn(() => ({ toDate: () => new Date() })),
    doc: jest.fn(),
  };
});

test('markAsPaid updates commission, lead and logs activity', async () => {
  await commissionsService.markAsPaid('cId', 'lId', 'adminUid', 'Admin Name');
  expect(writeBatch).toHaveBeenCalledWith(db);
});
```
Add more tests for services and pages as needed.

---

## License
This project is licensed under the MIT License.
