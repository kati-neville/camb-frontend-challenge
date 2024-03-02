// WaveForm.jsx

import { useRef, useEffect } from "react";
import { animateBars, getTrackWidth } from "../utils";
import { Analyzer } from "./track";

const WaveForm = ({
	analyzerData,
	index,
}: {
	analyzerData: Analyzer;
	index: number;
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const { dataArray, analyzer, bufferLength } = analyzerData;

	const draw = (
		dataArray?: Uint8Array,
		analyzer?: { getByteFrequencyData: (arg0: any) => void },
		bufferLength?: number
	) => {
		const canvas = canvasRef.current;
		if (!canvas || !analyzer) return;
		const canvasCtx = canvas.getContext("2d");

		function resolveTrackColorCode() {
			if (index % 3 === 1) return "#6742B6";
			if (index % 3 === 2) return "#B21C56";
			return "#F05C0C";
		}
		const animate = () => {
			requestAnimationFrame(animate);
			canvas.width = canvas.width;
			if (canvasCtx) {
				canvasCtx.fillStyle = resolveTrackColorCode();

				animateBars(analyzer, canvas, canvasCtx, dataArray!, bufferLength!);
			}
		};

		animate();
	};

	useEffect(() => {
		draw(dataArray!, analyzer, bufferLength);
	}, [dataArray, analyzer, bufferLength]);

	return <canvas ref={canvasRef} width={getTrackWidth()} height={200} />;
};

export default WaveForm;
