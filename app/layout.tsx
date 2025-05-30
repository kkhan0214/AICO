import '@/app/globals.css';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="w-full min-h-full">
      <body className="bg-white text-gray-900 font-sans w-full h-full">
        {children}
      </body>
    </html>
  );
}