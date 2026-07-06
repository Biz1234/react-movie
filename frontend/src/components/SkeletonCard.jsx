import "../css/SkeletonCard.css";

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-poster skeleton-shimmer" />
      <div className="skeleton-info">
        <div className="skeleton-title skeleton-shimmer" />
        <div className="skeleton-year skeleton-shimmer" />
      </div>
    </div>
  );
}

export default SkeletonCard;
