import DiagnosisResult from './components/DiagnosisResult';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-serif p-6">
      <h1 className="text-2xl text-center mb-8">Twinlightへようこそ</h1>
      <DiagnosisResult />
    </div>
  );
}