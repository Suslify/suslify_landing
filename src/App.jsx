import "./App.css";
import { useState } from "react";
import { ToastProvider } from "./providers/ToastProvider";
import WaitlistForm from "./components/WaitlistForm";

function ScreenshotTile({ src, alt, className, missingLabel }) {
	const [ok, setOk] = useState(true);
	return (
		<div className={`shot ${className ?? ""}`.trim()}>
			<div className="shot-inner">
				{ok ? (
					<img
						className="shot-img"
						src={src}
						alt={alt}
						loading="lazy"
						onError={() => setOk(false)}
					/>
				) : (
					<div className="shot-placeholder">{missingLabel}</div>
				)}
			</div>
		</div>
	);
}

function FeatureMini({ icon, title, description, points }) {
	const [expanded, setExpanded] = useState(false);
	const detailsId = `feature-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

	return (
		<article className="mini">
			<div className="mini-icon" aria-hidden="true">
				{icon}
			</div>
			<h3 className="mini-title">{title}</h3>
			<p className="mini-desc">{description}</p>

			{points?.length ? (
				<button
					type="button"
					className="mini-toggle"
					aria-expanded={expanded}
					aria-controls={detailsId}
					onClick={() => setExpanded((value) => !value)}>
					{expanded ? "Less" : "More"}
				</button>
			) : null}

			{points?.length ? (
				<ul
					id={detailsId}
					className={`mini-points ${expanded ? "is-open" : ""}`}>
					{points.map((point) => (
						<li key={point} className="mini-point">
							{point}
						</li>
					))}
				</ul>
			) : null}
		</article>
	);
}

function MediaImage({ src, alt, missingLabel }) {
	const [ok, setOk] = useState(true);
	if (!ok) {
		return <div className="shot-placeholder">{missingLabel}</div>;
	}
	return (
		<img
			className="media-img"
			src={src}
			alt={alt}
			loading="lazy"
			onError={() => setOk(false)}
		/>
	);
}

function App() {
	let viteEndpoint = "";
	try {
		viteEndpoint = import.meta.env.VITE_WAITLIST_ENDPOINT || "";
	} catch (e) {
		viteEndpoint = "";
	}

	return (
		<ToastProvider>
			<div className="page">
				<nav className="topbar" aria-label="Primary">
					<div className="container topbar-inner">
						<a className="brand" href="#top" aria-label="Suslify home">
							<span className="brand-mark" aria-hidden="true" />
							<span className="brand-name">Suslify</span>
						</a>
						<div
							className="topbar-tabs"
							role="navigation"
							aria-label="Page sections">
							<a className="tab" href="#features">
								Features
							</a>
							<a className="tab" href="#how-it-works">
								How it works
							</a>
							<a className="tab" href="#learn-more">
								Learn more
							</a>
						</div>
					</div>
				</nav>

				<header id="top" className="hero hero-centered">
					<div className="container hero-stack">
						<p className="hero-kicker">SUSLIFY</p>
						<h1 className="hero-headline">
							Give smarter.{" "}
							<span className="hero-accent">Waste less.</span>
						</h1>
						<p className="hero-subhead">
							Post donations or request items, form teams, follow charity
							news and urgent needs, and track donations all in one
							place.
						</p>

						<div className="hero-cta" id="waitlist">
							<WaitlistForm
								id="waitlist-form"
								endpoint={viteEndpoint}
							/>
						</div>
					</div>
				</header>

				<section className="shots" aria-label="App preview">
					<div className="container shots-grid">
						<ScreenshotTile
							src="/screens/home.svg"
							alt="Suslify app home screen preview"
							className="shot-tilt-left"
							missingLabel="Missing /screens/home.svg"
						/>
						<ScreenshotTile
							src="/screens/cart.svg"
							alt="Suslify app cart screen preview"
							className="shot-center"
							missingLabel="Missing /screens/cart.svg"
						/>
						<ScreenshotTile
							src="/screens/item.svg"
							alt="Suslify app item details screen preview"
							className="shot-tilt-right"
							missingLabel="Missing /screens/item.svg"
						/>
					</div>
				</section>

				<main>
					<section className="section mint" aria-label="Overview">
						<div className="container section-center">
							<h2 className="section-title">SUSLIFY</h2>
							<p className="section-lead">
								Create impact with the items you already have.
							</p>
							<div className="stats">
								<div className="stat">
									<div className="stat-value">N/A</div>
									<div className="stat-label">Donations</div>
								</div>
								<div className="stat">
									<div className="stat-value">N/A</div>
									<div className="stat-label">Charities</div>
								</div>
								<div className="stat">
									<div className="stat-value">N/A</div>
									<div className="stat-label">Donors</div>
								</div>
							</div>
						</div>
					</section>

					<section className="section" aria-label="Partner organizations">
						<div className="container partners">
							<p className="partners-kicker">
								Partner organizations — coming soon
							</p>
							<div className="partners-row" role="list">
								<div className="partner" role="listitem">
									Coming soon
								</div>
								<div className="partner" role="listitem">
									Coming soon
								</div>
								<div className="partner" role="listitem">
									Coming soon
								</div>
								<div className="partner" role="listitem">
									Coming soon
								</div>
							</div>
						</div>
					</section>

					<section id="features" className="section">
						<div className="container">
							<div className="section-head">
								<h2 className="section-h2">
									Effortlessly donate to your favourite charities
								</h2>
								<p className="section-p">
									Post items, connect with trusted organizations, and
									track what you’ve donated.
								</p>
							</div>

							<div className="mini-grid">
								<FeatureMini
									icon="📦"
									title="Post donations or request items"
									description="Create a donation listing or request a needed item in seconds."
									points={[
										"Add photos, condition, and quantity",
										"Choose a category and location",
										"Post requests when you need specific items",
										"Edit or remove listings anytime",
									]}
								/>
								<FeatureMini
									icon="👥"
									title="Create teams and shared requests"
									description="Charities and individuals can form teams and raise shared donation requests together."
									points={[
										"Invite members to one request board",
										"Track team goals and progress together",
										"Coordinate who handles pickup or follow-up",
									]}
								/>
								<FeatureMini
									icon="📰"
									title="Unified charity and impact feed"
									description="Stay up to date with charity updates, urgent needs, and support opportunities in one feed."
									points={[
										"Follow charity news and request updates",
										"See disaster alerts and related support drives",
										"Surface campaigns from apps like GoFundMe",
									]}
								/>
								<FeatureMini
									icon="✅"
									title="Track donations from start to finish"
									description="Stay updated from listing to pickup, handoff, and confirmation in one place."
									points={[
										"Clear status for each donation",
										"Keep donation history organized",
										"Know what was accepted and when",
									]}
								/>
							</div>
						</div>
					</section>

					<section
						id="how-it-works"
						className="section mint"
						aria-label="How it works">
						<div className="container">
							<div className="section-head">
								<h2 className="section-h2">How it works</h2>
								<p className="section-p">
									A simple flow designed to get items to people who
									need them.
								</p>
							</div>

							<div className="steps">
								<article className="step">
									<div className="step-top">
										<div className="step-num">1</div>
										<h3 className="step-title">
											Post a donation or request an item
										</h3>
									</div>
									<p className="step-desc">
										Individuals and charities can post items to
										donate, or create item requests, then invite
										teammates and set shared goals.
									</p>
								</article>

								<article className="step">
									<div className="step-top">
										<div className="step-num">2</div>
										<h3 className="step-title">
											Match donations and coordinate handoff
										</h3>
									</div>
									<p className="step-desc">
										Match items to active needs, then coordinate
										pickup or drop-off with team members and
										organizations.
									</p>
								</article>

								<article className="step">
									<div className="step-top">
										<div className="step-num">3</div>
										<h3 className="step-title">
											Stay updated in your feed
										</h3>
									</div>
									<p className="step-desc">
										Follow charity news, disaster response updates,
										and campaigns from platforms like GoFundMe in one
										place.
									</p>
								</article>
							</div>
						</div>
					</section>

					<section className="section band">
						<div className="container split">
							<div className="split-media">
								<div className="media-card">
									<MediaImage
										src="/screens/item.svg"
										alt="Suslify app item details screen preview"
										missingLabel="Missing /screens/item.svg"
									/>
								</div>
							</div>
							<div className="split-copy">
								<h2 className="split-title">Easy setup</h2>
								<p className="split-desc">
									Create your profile, add an item, and connect with a
									charity. No complicated steps.
								</p>
								<div className="split-actions">
									<a className="btn btn-primary" href="#top">
										Join waitlist
									</a>
									<a className="btn btn-ghost" href="#learn-more">
										Learn more
									</a>
								</div>
							</div>
						</div>
					</section>

					<section
						id="learn-more"
						className="section"
						aria-label="Learn more">
						<div className="container">
							<div className="section-head">
								<h2 className="section-h2">Learn more</h2>
								<p className="section-p">
									Want to partner, give feedback, or follow along? Here
									are the best ways to reach me.
								</p>
							</div>

							<div className="learn-grid">
								<article className="learn-card">
									<h3 className="learn-title">Contact</h3>
									<p className="learn-desc">
										Connect with me on LinkedIn.
									</p>
									<a
										className="btn btn-primary"
										href="https://www.linkedin.com/in/sana-udoekong/"
										target="_blank"
										rel="noreferrer">
										LinkedIn
									</a>
								</article>
								<article className="learn-card">
									<h3 className="learn-title">Feedback</h3>
									<p className="learn-desc">
										Share what you want to see in Suslify.
									</p>
									<a
										className="btn btn-ghost"
										href="https://forms.gle/zkx2MMfZv3YBTBbZA"
										target="_blank"
										rel="noreferrer">
										Feedback form
									</a>
								</article>
							</div>
						</div>
					</section>

					<section className="section">
						<div className="container cta">
							<div className="cta-inner">
								<div>
									<h2 className="cta-title">Join our community</h2>
									<p className="cta-desc">
										Be the first to try Suslify when early access
										opens.
									</p>
								</div>
								<a className="btn btn-invert" href="#top">
									Join waitlist
								</a>
							</div>
						</div>
					</section>
				</main>

				<footer className="footer">
					<div className="container footer-inner">
						<div className="footer-brand">
							<div className="brand brand-footer">
								<span className="brand-mark" aria-hidden="true" />
								<span className="brand-name">Suslify</span>
							</div>
							<p className="footer-copy">
								Suslify helps people donate items they no longer need to
								charities.
							</p>
						</div>

						<div className="footer-links">
							<a href="#" className="footer-link">
								Privacy
							</a>
							<a href="#" className="footer-link">
								Terms
							</a>
							<a href="#learn-more" className="footer-link">
								Contact
							</a>
						</div>

						<p className="footer-legal">© 2026 Suslify</p>
					</div>
				</footer>
			</div>
		</ToastProvider>
	);
}

export default App;
