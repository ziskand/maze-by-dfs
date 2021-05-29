<script>
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";
	import { writable } from "svelte/store";

	import DFS from "./DFS.js";
	import Cell from "./Cell.js";
	import Config from "./Config.js";

	const dataPoints = writable([]);
	const initialNode = new Cell(50, 50);

	dataPoints.update((visited) => (visited = [...visited, initialNode]));

	onMount(async () => {
		await DFS({ root: initialNode }, dataPoints);
	});
</script>

<div class="container">
	<svg width={Config.mapWidth} height={Config.mapHeight}>
		{#each $dataPoints as datapoint, index}
			<rect
				transition:fade={{ delay: index * 70 }}
				x={datapoint.x}
				y={datapoint.y}
				width={Config.step}
				height={Config.step}
			/>
		{/each}
		<rect
			x={Config.minPosition}
			y={Config.minPosition}
			style="fill:purple;"
			width={Config.step}
			height={Config.step}
		/>
		<rect
			x={Config.maxPosition}
			y={Config.maxPosition}
			style="fill:purple;"
			width={Config.step}
			height={Config.step}
		/>
	</svg>
</div>

<style>
	svg {
		background-color: whitesmoke;
	}
	rect {
		fill: lightblue;
	}
</style>
