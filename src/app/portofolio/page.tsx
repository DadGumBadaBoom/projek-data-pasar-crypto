
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PortofolioPage() {
  return (
    <main className="flex-1 p-6">
      <h2 className="text-3xl font-bold mb-6">Portofolio</h2>
      <Card>
        <CardHeader>
          <CardTitle>Halaman Portofolio</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Konten untuk analisis portofolio akan ditampilkan di sini.</p>
        </CardContent>
      </Card>
    </main>
  );
}
