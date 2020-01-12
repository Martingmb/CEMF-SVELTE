<script>
	import 'bulma/css/bulma.css';
	import io from 'socket.io-client';
	const socket = io('http://localhost:8080');

</script>

<style>
	main {
		height: 100%;
	}
</style>

<main>
	<slot></slot>
</main>