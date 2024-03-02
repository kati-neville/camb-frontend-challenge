import { Button } from "./button";

import play from "../assets/svgs/play.svg";
import pause from "../assets/svgs/pause.svg";
import forward from "../assets/svgs/forward.svg";
import { Badge } from "./badge";

export const AudioControls = () => {
	return (
		<div className="w-full relative text-camb-white h-full flex items-center justify-center">
			<div className="absolute left-0">
				<Badge>00:01:17 / 00:30:10</Badge>
			</div>

			<div className="flex justify-center items-center space-x-4">
				<Button className="bg-camb-primary-500">
					<img
						src={forward}
						alt="forward icon"
						className="transform rotate-180"
					/>
				</Button>
				<Button>
					<img src={play} alt="play icon" />
				</Button>
				<Button className="bg-camb-primary-500 text-white">
					<img src={forward} alt="forward icon" />
				</Button>
			</div>
		</div>
	);
};
