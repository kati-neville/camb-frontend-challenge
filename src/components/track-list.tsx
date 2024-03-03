import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Track from "./track";
import plus from "../assets/svgs/plus.svg";
import { ChangeEvent, useRef, useState } from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";

export type AudioFile = {
	id: string;
	name: string;
	url: string;
	analyzerData: Analyzer;
};

export type Analyzer = {
	analyzer?: AnalyserNode;
	bufferLength?: number;
	dataArray?: Uint8Array;
};
export const TrackList = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const audioRef = useRef<HTMLAudioElement>(null);
	const trackListWrapperRef = useRef<HTMLDivElement>(null);
	const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);

	// for some reason the audion ref is not being read, returns null

	console.log("REF: -- ", audioRef.current);

	function onDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (active.id === over?.id) return;

		console.log("EVENT: --", event);
	}

	const audioAnalyzer = () => {
		const audioCtx = new window.AudioContext();
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

			return { analyzer, bufferLength, dataArray };
		}
	};

	const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (!file) return;

		// because the audioRef is not found the analyzerData can't be parsed  hence the songs play but no graph

		const analyzerData = audioAnalyzer();

		setAudioFiles(prev => [
			...prev,
			{
				id: crypto.randomUUID.toString(),
				name: file.name,
				url: URL.createObjectURL(file),
				analyzerData: analyzerData || {},
			},
		]);
	};

	return (
		<div
			ref={trackListWrapperRef}
			className="flex flex-col border-2 flex-1 rounded-3xl my-4 md:w-full min-w-fit border-camb-primary-100">
			<DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
				<SortableContext
					items={audioFiles}
					strategy={verticalListSortingStrategy}>
					{audioFiles.map((file, index) => {
						return (
							<>
								<Track
									key={file.id}
									index={index}
									audioFile={file}
									audioRef={audioRef}
								/>

								<audio
									src={file.url ?? ""}
									hidden
									controls
									loop
									ref={audioRef}
								/>
							</>
						);
					})}
				</SortableContext>
			</DndContext>

			<input
				type="file"
				accept="audio/*"
				ref={inputRef}
				className="hidden"
				onChange={onFileChange}
			/>

			<div className="h-full flex justify-center items-center">
				<button
					onClick={() => inputRef?.current?.click()}
					className="border font-urbanist border-dashed w-fit md:px-6 px-3 flex mx-auto items-center justify-center space-x-4 border-camb-white md:h-16 h-10 rounded-xl text-xl text-camb-white hover:bg-camb-primary-100">
					<span>
						<img src={plus} alt="plus icon" className="md:w-8 md:h-8 w-4 h-4" />
					</span>

					<span className="md:text-base text-xs">
						Drag and drop files or click to add audio file
					</span>
				</button>
			</div>
		</div>
	);
};
