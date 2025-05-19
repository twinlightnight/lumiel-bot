type MenuItem = {
  name: string;
  price: string;
};

const recommendedMenus: MenuItem[] = [
  { name: "魂の声とつながる日記ワーク", price: "無料" },
  { name: "満月・新月の月相ワーク", price: "500円" },
  { name: "他者支援準備のためのワーク", price: "2,000円" },
];

export default function DiagnosisResult() {
  return (
    <div className="space-y-6 max-w-xl mx-auto text-center">
      <h2 className="text-xl mb-4">ルミエルが照らした、今のあなたに必要な祈りの道は──</h2>
      <ul className="space-y-4">
        {recommendedMenus.map((menu, idx) => (
          <li key={idx} className="bg-white/10 backdrop-blur-md p-4 rounded-xl text-white hover:bg-white/20 transition">
            <span className="text-lg">{menu.name}</span>
            <span className="block text-sm text-gray-300 mt-1">（{menu.price}）</span>
          </li>
        ))}
      </ul>
    </div>
  );
}