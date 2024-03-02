import { AudioControls } from "./components/audio-controls";
import { TrackList } from "./components/track-list";
import { Navbar } from "./components/navbar";
import { Timeline } from "./components/timeline";

function App() {
	return (
		<>
			<main className="lg:flex hidden h-screen flex-col bg-camb-primary-500 text-camb-white items-center justify-between">
				<Navbar />

				<section className="flex-1 flex flex-col w-full pl-10 overflow-auto">
					{/* <AddFile /> */}
					<TrackList />
				</section>

				<section className="w-full h-20 px-10 bg-camb-primary-100">
					<AudioControls />
				</section>
			</main>

			<main className="h-screen lg:hidden">
				<section className="h-full text-camb-white px-8 flex justify-center items-center text-xl">
					The experience is optimized for desktops and larger screens. For the
					full suite of features please connect through the desktop or a larger
					screen
				</section>
			</main>
		</>
	);
}

export default App;
