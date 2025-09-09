
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function KolsPage() {
  return (
    <main className="flex-1 p-6">
      <h2 className="text-3xl font-bold mb-6">Key Opinion Leaders (KOLs)</h2>
      <Card>
        <CardHeader>
          <CardTitle>Halaman KOLs</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Konten untuk melacak Key Opinion Leaders akan ditampilkan di sini.</p>
        </CardContent>
      </Card>
    </main>
  );
}
