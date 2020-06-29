<script>
	import { images, sudoImg } from '../components/DebianServer/images-store'
	import Nav from '../components/Layouts/Nav.svelte';
	import Footer from '../components/Layouts/Footer.svelte'

	export let segment;
	export let root
	let rndImg = Math.floor(Math.random() * $images.length)
	let rndRootImg = Math.floor(Math.random() * $sudoImg.length)
	// $: console.log($images)
	
</script>

<style>
	main {
		padding: 0;
		margin: 0;
		height: 100vh;
		width: 100%;
		background-size: cover;
		font-family: Verdana, sans-serif;
		font-size: 1rem;
		text-align: center;
		color: whitesmoke;
		text-shadow: 1px 1px 1px rgba(0,0,0,0.95)
	}
</style>


<main style="background-image: url('./img/{root? $sudoImg[rndRootImg] : $images[rndImg]}'" >
	<Nav {segment}/>
	<slot></slot>
	<Footer />
</main>