import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | OCR',
    default: 'OCR',
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
