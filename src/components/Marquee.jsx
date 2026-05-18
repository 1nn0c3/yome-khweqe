const items = ['YOME KHWEQE', 'SINCE DAY ONE', 'JOBURG']

function MarqueeContent() {
  return (
    <>
      {items.map((text, i) => (
        <span key={`${text}-${i}`} className="marquee-item">
          {text}
          <span className="marquee-diamond"> ◆ </span>
        </span>
      ))}
    </>
  )
}

export default function Marquee() {
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </div>
  )
}
