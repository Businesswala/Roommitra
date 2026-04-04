import { ListerTable } from '@/components/admin/ListerTable';

export const dynamic = 'force-dynamic';

export default async function AdminPortal() {
  const pendingListers = [
      { id: "1", firstName: "Rahul", surname: "Sharma", dob: new Date("1990-01-01"), mobile1: "1234567890", email: "rahul@test.com", passwordHash: "dummy", address: "Koramangala", latitude: 12.9, longitude: 77.6, documentNo: "PAN123", status: "PENDING", createdAt: new Date() },
      { id: "2", firstName: "Priya", surname: "Patel", dob: new Date("1995-05-05"), mobile1: "0987654321", email: "priya@test.com", passwordHash: "dummy", address: "Indiranagar", latitude: 12.9, longitude: 77.6, documentNo: "AADHAR123", status: "PENDING", createdAt: new Date() }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Access Control Center</h1>
          <p className="text-slate-500 mt-2 max-w-xl">Supervise incoming Lister registration requests awaiting verification before they enter the marketplace ecosystem.</p>
        </div>
      </div>
      
      {/* Injecting Server-Side payloads efficiently down to Client bounds */}
      <ListerTable initialData={pendingListers} />
    </div>
  );
}
