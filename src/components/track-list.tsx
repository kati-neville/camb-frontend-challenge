import {
	SortableContext,
	arrayMove,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Track from "./track";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { useRef, useState } from "react";
import { Timeline } from "./timeline";

export const TrackList = () => {
	const trackListWrapperRef = useRef<HTMLDivElement>(null);
	const [arr, setArr] = useState([0, 1, 2, 3, 4, 5]);

	function onDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (active.id === over?.id) return;

		setArr(prevArr => {
			const oldArr = prevArr.findIndex(arr => arr === active.id);
			const newArr = prevArr.findIndex(arr => arr === over?.id);

			return arrayMove(arr, oldArr, newArr);
		});
	}

	return (
		<div
			ref={trackListWrapperRef}
			className="flex flex-col border-2 flex-1 rounded-3xl my-4 border-camb-primary-100">
			<DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
				<SortableContext items={arr} strategy={verticalListSortingStrategy}>
					{arr.map(val => {
						return <Track index={val} />;
					})}
				</SortableContext>
			</DndContext>
		</div>
	);
};
