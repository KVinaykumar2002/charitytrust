"use client";

export default function AdminTestPage() {
  return (
    <div className="p-8">
      <div className="bg-green-500 text-white p-4 rounded mb-4">
        <h1 className="text-2xl font-bold">✅ Admin Test Page is Working!</h1>
        <p>If you can see this, the admin layout is rendering correctly.</p>
      </div>
      
      <div className="bg-blue-100 p-4 rounded">
        <h2 className="font-bold mb-2">Debug Info:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Page: /admin/test</li>
          <li>Layout: Admin Layout</li>
          <li>Status: Rendering successfully</li>
        </ul>
      </div>
    </div>
  );
}

