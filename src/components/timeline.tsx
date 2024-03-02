import { getTrackWidth } from "../utils";

export const Timeline = () => {
	return (
		<div
			// 12px added is for the padding right- pr-3 - on the parent container
			// 4px added is for the padding right- border-4 - on the parent container

			style={{ right: getTrackWidth() + 12 + 4 }}
			className={`w-[1px] h-full absolute bg-red-500`}></div>
	);
};
