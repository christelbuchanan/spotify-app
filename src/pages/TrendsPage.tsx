import BarList from "../components/charts/BarList";
import PageIntro from "../components/ui/PageIntro";
import SectionCard from "../components/ui/SectionCard";
import StateNotice from "../components/ui/StateNotice";
import { fetchTrendsData } from "../data/mockSpotify";
import { useAsyncResource } from "../hooks/useAsyncResource";
import { formatMinutes } from "../lib/analytics";
import { useDataScenario } from "../state/DataScenarioContext";

export default function TrendsPage() {
  const { scenario } = useDataScenario();
  const { data, loading, error, reload } = useAsyncResource(() => fetchTrendsData(scenario), [scenario]);

  if (loading) {
    return <StateNotice variant="loading" title="Calculating trendlines" description="Crunching your genre shifts and listening rhythm..." />;
  }

  if (error) {
    return <StateNotice variant="error" title="Could not load trends" description={error} actionLabel="Retry" onAction={reload} />;
  }

  if (!data) {
    return <StateNotice title="No trend data" description="There is no listening trend data to show yet." />;
  }

  const hasGenreData = data.genreShare.length > 0;
  const hasHistory = data.history.length > 0;

  return (
    <div className="space-y-5">
      <PageIntro title="Trends" description="See how your listening evolved across months and genres." />

      <div className="grid gap-5 lg:grid-cols-2">
        <SectionCard title="Genre share" subtitle="Minutes listened by category.">
          {hasGenreData ? (
            <BarList
              data={data.genreShare.map((item) => ({ label: item.genre, value: item.minutes }))}
              valueLabel={(value) => `${formatMinutes(value)} min`}
            />
          ) : (
            <StateNotice title="No genre trend yet" description="Keep listening to build your genre footprint." />
          )}
        </SectionCard>

        <SectionCard title="Monthly listening" subtitle="How your listening volume changed through the year.">
          {hasHistory ? (
            <BarList
              data={data.history.map((item) => ({ label: item.month, value: item.minutes }))}
              valueLabel={(value) => `${formatMinutes(value)} min`}
            />
          ) : (
            <StateNotice title="No monthly history" description="Play activity is required before we can draw trend lines." />
          )}
        </SectionCard>

        <SectionCard title="Discovery pace" subtitle="New artists added each month.">
          {hasHistory ? (
            <BarList data={data.history.map((item) => ({ label: item.month, value: item.newArtists }))} valueLabel={(value) => `${value} artists`} />
          ) : (
            <StateNotice title="No discovery data" description="Your discovery chart will appear after your first few weeks of playback." />
          )}
        </SectionCard>

        <SectionCard title="Summary" subtitle="Quick read of your listening behavior.">
          {hasHistory && hasGenreData ? (
            <ul className="space-y-2 text-sm text-slate-300">
              <li>Peak month: {data.history.reduce((a, b) => (a.minutes > b.minutes ? a : b)).month}</li>
              <li>Top genre: {data.genreShare[0].genre}</li>
              <li>Total minutes tracked: {formatMinutes(data.history.reduce((acc, month) => acc + month.minutes, 0))}</li>
            </ul>
          ) : (
            <StateNotice title="Summary unavailable" description="We need more data points to provide a reliable summary." />
          )}
        </SectionCard>
      </div>
    </div>
  );
}
