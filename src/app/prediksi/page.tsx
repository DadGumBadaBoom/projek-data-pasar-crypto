
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrediksiPage() {
  return (
    <main className="flex-1 p-6">
      <h2 className="text-3xl font-bold mb-6">Prediksi</h2>
      <Card>
        <CardHeader>
          <CardTitle>Halaman Prediksi</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Konten untuk prediksi tren pasar akan ditampilkan di sini.</p>
        </CardContent>
      </Card>
    </main>
  );
}
