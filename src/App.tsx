import { AudioControls } from "./components/audio-controls";
import { TrackList } from "./components/track-list";
import { Navbar } from "./components/navbar";

function App() {
	return (
		<>
			<main className="flex h-screen flex-col bg-camb-primary-500 text-camb-white items-center justify-between">
				<Navbar />

				<section className="flex-1 flex flex-col w-full md:pl-10 px-4 md:px-0 overflow-auto">
					{/* <AddFile /> */}
					<TrackList />
				</section>

				<section className="w-full md:h-20 h-32 px-10 bg-camb-primary-100">
					<AudioControls />
				</section>
			</main>
		</>
	);
}

export default App;
