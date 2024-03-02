import plus from "../assets/svgs/plus.svg";

export const AddFile = () => {
	return (
		<div className="w-full h-full font-urbanist justify-center items-center flex ">
			<button className="border border-dashed flex items-center justify-center space-x-4 border-camb-white h-16 w-1/2 rounded-xl text-xl text-camb-white hover:bg-camb-primary-100">
				<span>
					<img src={plus} alt="plus icon" />
				</span>

				<span>Drag and drop files or click to add audio file</span>
			</button>
		</div>
	);
};
