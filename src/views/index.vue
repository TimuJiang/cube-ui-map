<template lang='pug'>
	.index
		cube-button() HAHA
		dt-map
</template>

<script>
	import DtMap from '@/components/dt-map'
	export default {
		name: 'index',
	components: { DtMap }
	}
</script>
<style lang="scss" scoped>
	.index {
		width: 100vw;
		height: 100vh;
	}
</style>
