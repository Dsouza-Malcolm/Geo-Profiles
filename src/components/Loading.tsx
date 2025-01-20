const Loading = () => {
  return (
    <div className="h-screen flex flex-col gap-6 nunito-medium items-center justify-center text-xl bg-zinc-100">
      <p>GeoProfiles</p>
      <div
        className="w-8 h-8 border-4 border-zinc-900 border-t-zinc-200 rounded-full animate-spin"
        role="status"
        aria-label="loading"
      ></div>
    </div>
  );
};

export default Loading;
