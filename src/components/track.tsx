import { cn } from "../utils";
import { Badge } from "./badge";
import WaveForm from "./waveform";
import { Button } from "./button";
import { CSS } from "@dnd-kit/utilities";
import play from "../assets/svgs/play.svg";
import pause from "../assets/svgs/pause.svg";
import { useSortable } from "@dnd-kit/sortable";
import restart from "../assets/svgs/restart.svg";
import { useState, RefObject } from "react";
import { AudioFile } from "./track-list";

export default function Track({
	index,
	audioRef,
	audioFile,
}: {
	index: number;
	audioRef: RefObject<HTMLAudioElement>;
	audioFile: AudioFile;
}) {
	const { transform, transition } = useSortable({ id: index });
	const { name, analyzerData } = audioFile;
	const [isPaused, setIsPaused] = useState(false);

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
				className={cn("py-6 pr-3 md:w-full flex justify-center", {
					"border-t-0": index === 0,
					"w-[50rem]": hasAudioData,
					"border-t-2 border-camb-primary-100": hasAudioData && index !== 0,
					"border-b-2 border-camb-primary-100 justify-end":
						hasAudioData && index !== 0,
				})}>
				{hasAudioData ? (
					<div className="flex flex-col space-y-3 w-20 justify-center items-center">
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
						"flex items-end relative bg-gradient-to-b flex-1 cursor-pointer rounded-3xl overflow-hidden",
						{
							"h-[200px] bg-black justify-end": hasAudioData,
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
							{name.substring(0, 20) + " " + "..."}
						</Badge>
					</div>

					{hasAudioData && (
						<WaveForm analyzerData={analyzerData} index={index} />
					)}
				</div>
			</div>
			{/* {hasAudioData ? null : (
				<div className="h-full flex justify-center items-center">
					<button
						onClick={() => inputRef?.current?.click()}
						className="border font-urbanist border-dashed w-fit md:px-6 px-3 flex mx-auto items-center justify-center space-x-4 border-camb-white md:h-16 h-10 rounded-xl text-xl text-camb-white hover:bg-camb-primary-100">
						<span>
							<img
								src={plus}
								alt="plus icon"
								className="md:w-8 md:h-8 w-4 h-4"
							/>
						</span>

						<span className="md:text-base text-xs">
							Drag and drop files or click to add audio file
						</span>
					</button>
				</div>
			)} */}
		</>
	);
}
