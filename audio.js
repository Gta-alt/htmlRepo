/** @format */

const stations = [
	{
		name: "Radio Free Europe/Radio Liberty",
		streamUrl: "https://stream.zeno.fm/my-radio-station-abc123",
		logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Radio-Free-Social-Icon.png/800px-Radio-Free-Social-Icon.png",
	},
	{
		name: "Radio Massive",
		streamUrl: "https://stream.zeno.fm/radio-massive",
		logo: "https://www.brandsoftheworld.com/sites/default/files/styles/logo-thumbnail/public/072013/radio-massive.png?itok=Qz5B6Hq7",
	},
	{
		name: "Live365 Radio",
		streamUrl: "https://stream.zeno.fm/live365-radio",
		logo: "https://www.live365.com/assets/images/logos/live365-logo.png",
	},
];

const main = document.getElementById("main-content");

// Function to generate a single audio card
function createAudioCard(station) {
	return `
        <div class="audio-card">
          <img src="${station.logo}" alt="${
		station.name
	}" class="station-logo" />
          <h3>${station.name}</h3>
          <audio controls loop preload="none" data-src="${
						station.streamUrl
					}">
            Your browser does not support the audio tag.
          </audio>
          <div class="visualizer">
            ${'<div class="bar"></div>'.repeat(24)}
          </div>
        </div>
      `;
}

// Render all cards
function renderCards(stations) {
	main.innerHTML = stations.map(createAudioCard).join("");

	// Randomize visualizer animation speed
	document.querySelectorAll(".audio-card").forEach((card) => {
		card.querySelectorAll(".bar").forEach((bar) => {
			const duration = (0.8 + Math.random() * 0.6).toFixed(2);
			bar.style.animationDuration = `${duration}s`;
		});
	});

	// Lazy load audio using Intersection Observer
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const audio = entry.target;
					if (!audio.src) {
						audio.src = audio.dataset.src;
						audio.load();
					}
				}
			});
		},
		{ root: null, rootMargin: "0px", threshold: 0.1 }
	);

	document
		.querySelectorAll("audio[data-src]")
		.forEach((audio) => observer.observe(audio));
}

// Render cards
renderCards(stations);
