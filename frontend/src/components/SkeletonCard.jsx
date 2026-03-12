function SkeletonCard() {
  return (
    <div className="bg-primary p-5 rounded-xl shadow animate-pulse">

      <div className="h-4 bg-filler rounded w-1/2 mb-4"></div>

      <div className="h-8 bg-filler rounded w-1/3 mb-2"></div>

      <div className="h-3 bg-filler rounded w-1/4"></div>

    </div>
  );
}

export default SkeletonCard;