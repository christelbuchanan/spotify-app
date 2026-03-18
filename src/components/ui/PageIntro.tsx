interface PageIntroProps {
  title: string;
  description: string;
}

export default function PageIntro({ title, description }: PageIntroProps) {
  return (
    <header className="mb-5">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <p className="mt-1 text-sm text-slate-300">{description}</p>
    </header>
  );
}
