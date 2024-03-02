import { cn } from "../utils";
import { Badge } from "./badge";
import WaveForm from "./waveform";
import { Button } from "./button";
import plus from "../assets/svgs/plus.svg";
import { CSS } from "@dnd-kit/utilities";
import play from "../assets/svgs/play.svg";
import pause from "../assets/svgs/pause.svg";
import { useSortable } from "@dnd-kit/sortable";
import restart from "../assets/svgs/restart.svg";
import { useState, useRef, ChangeEvent, LegacyRef } from "react";

export type Analyzer = {
	analyzer?: AnalyserNode;
	bufferLength?: number;
	dataArray?: Uint8Array;
};

export default function Track({ index }: { index: number }) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: index });
	const inputRef: LegacyRef<HTMLInputElement> = useRef(null);
	const [audio, setAudio] = useState({ name: "", url: "" });
	const [isPaused, setIsPaused] = useState(false);
	const [analyzerData, setAnalyzerData] = useState<Analyzer>();
	const audioRef = useRef<HTMLAudioElement>(null);

	const audioAnalyzer = () => {
		// create a new AudioContext
		const audioCtx = new window.AudioContext();
		// create an analyzer node with a buffer size of 2048
		const analyzer = audioCtx.createAnalyser();
		analyzer.fftSize = 2048;

		if (audioRef.current) {
			const bufferLength = analyzer.frequencyBinCount;
			const dataArray = new Uint8Array(bufferLength);
			const source = audioCtx.createMediaElementSource(audioRef.current);
			source.connect(analyzer);
			source.connect(audioCtx.destination);
			//@ts-ignore
			source.onended = () => {
				source.disconnect();
			};
			// set the analyzerData state with the analyzer, bufferLength, and dataArray
			setAnalyzerData({ analyzer, bufferLength, dataArray });
		}
	};

	const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (!file) return;
		setAudio({ url: URL.createObjectURL(file), name: file.name });
		audioAnalyzer();
	};

	function handlePlay() {
		if (isPaused) {
			audioRef.current?.play();
		} else {
			audioRef.current?.pause();
		}
		setIsPaused(!isPaused);
	}

	function handleRestart() {
		audioRef.current?.load();
		setIsPaused(true);
	}

	const hasAudioData = !!analyzerData;

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};

	return (
		<>
			<div
				// ref={setNodeRef}
				style={style}
				// {...attributes}
				// {...listeners}
				className={cn("py-6 pr-3 w-full flex justify-center", {
					"border-t-0": index === 0,
					"border-t-2 border-camb-primary-100": hasAudioData && index !== 0,
					"border-b-2 border-camb-primary-100 justify-end":
						hasAudioData && index !== 0,
				})}>
				{hasAudioData ? (
					<div className="flex-1 flex flex-col space-y-3 justify-center items-center">
						<Button
							title={isPaused ? "Play" : "Pause"}
							className="w-8 h-8"
							onClick={handlePlay}>
							<img
								src={isPaused ? play : pause}
								alt="play icon"
								className="w-5 h-5"
							/>
						</Button>
						<Button title="Restart" className="w-8 h-8" onClick={handleRestart}>
							<img src={restart} alt="play icon" className="w-5 h-5" />
						</Button>
					</div>
				) : null}
				<div
					onClick={handlePlay}
					className={cn(
						"flex items-end relative bg-gradient-to-b cursor-pointer rounded-3xl overflow-hidden",
						{
							"h-[200px] bg-black justify-end w-fit": hasAudioData,
							"justify-center px-2": !hasAudioData,
							"from-camb-primary-500 to-camb-orange/40 border-4 border-camb-orange":
								hasAudioData && index % 3 === 0,
							"from-camb-primary-100 to-camb-purple/20 border-4 border-camb-purple":
								hasAudioData && index % 3 === 1,
							"from-camb-primary-500 to-camb-pink/30 border-4 border-camb-pink ":
								hasAudioData && index % 3 === 2,
						}
					)}>
					<div className="absolute left-2 top-2">
						<Badge
							className={cn("text-xs", {
								"bg-camb-orange": index % 3 === 0,
								"bg-camb-purple": index % 3 === 1,
								"bg-camb-pink": index % 3 === 2,
							})}>
							{audio.name.substring(0, 20) + " " + "..."}
						</Badge>
					</div>

					{hasAudioData && (
						<WaveForm analyzerData={analyzerData} index={index} />
					)}
					<div className="flex justify-around items-center">
						<input
							type="file"
							accept="audio/*"
							ref={inputRef}
							className="hidden"
							onChange={onFileChange}
						/>
						<audio src={audio.url ?? ""} hidden controls loop ref={audioRef} />
					</div>
				</div>
			</div>
			{hasAudioData ? null : (
				<button
					onClick={() => inputRef?.current?.click()}
					className="border font-urbanist border-dashed w-fit px-6 flex mx-auto items-center justify-center space-x-4 border-camb-white h-16 rounded-xl text-xl text-camb-white hover:bg-camb-primary-100">
					<span>
						<img src={plus} alt="plus icon" />
					</span>

					<span>Drag and drop files or click to add audio file</span>
				</button>
			)}
		</>
	);
}
