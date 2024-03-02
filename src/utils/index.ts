import classNames from "classnames";
import { twMerge } from "tailwind-merge";

export function cn(...args: classNames.ArgumentArray) {
	return twMerge(classNames(args));
}

// This function takes in the audio data, analyzes it, and generates a waveform
// that is visualized on a canvas element.
export const animateBars = (
	analyser: { getByteFrequencyData: (arg0: any) => void },
	canvas: { height: number; width: number },
	canvasCtx: CanvasRenderingContext2D,
	dataArray: Uint8Array,
	bufferLength: number
) => {
	analyser.getByteFrequencyData(dataArray);

	const HEIGHT = canvas.height;

	var barWidth = Math.ceil(canvas.width / bufferLength) * 2;

	let barHeight: 200;
	let x = 0;

	for (var i = 0; i < bufferLength; i++) {
		barHeight = (dataArray[i] / 400) * HEIGHT;

		canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

		x += barWidth + 1;
	}
};

export function getTrackWidth() {
	return window.innerWidth - 150;
}
