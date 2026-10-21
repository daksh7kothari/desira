export default function InstagramFeed() {
  return (
    <section
      className="instagram-feed-section"
      aria-labelledby="instagram-feed-title"
    >
      <div className="instagram-feed__header">
        <div>
          <p className="instagram-feed__eyebrow">From the creation crew</p>
          <h2 id="instagram-feed-title">Beyond the Brief.</h2>
        </div>
        <a
          className="instagram-feed__handle"
          href="https://www.instagram.com/desira.ft/"
          target="_blank"
          rel="noreferrer"
        >
          @desira.ft <span aria-hidden="true">↗</span>
        </a>
      </div>
      <iframe
        className="instagram-feed__widget"
        src="https://widgets.sociablekit.com/instagram-feed/iframe/25723764"
        title="Recent Instagram posts from Desira"
        frameBorder="0"
        width="100%"
        height="60%"
        scrolling="no"
      />
    </section>
  );
}
