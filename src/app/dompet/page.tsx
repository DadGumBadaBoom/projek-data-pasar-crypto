
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DompetPage() {
  return (
    <main className="flex-1 p-6">
      <h2 className="text-3xl font-bold mb-6">Dompet</h2>
      <Card>
        <CardHeader>
          <CardTitle>Halaman Dompet</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Konten untuk manajemen dompet akan ditampilkan di sini.</p>
        </CardContent>
      </Card>
    </main>
  );
}
