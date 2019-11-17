<script>
	import 'bulma/css/bulma.css';
	import Login from './login.svelte';

</script>

<style>
	.has-image-centered {
		margin-left: auto;
		margin-right: auto;
	}
</style>

<section class="hero has-text-centered">
  <div class="hero-body">
	<div class="container">
	  <h1 class="title">
		Bienvenido
	  </h1>
	  <figure class="image is-128x128 has-image-centered">
		  <img src="iglesiacemf.jpg" alt="CEMF">
	  </figure>
	</div>
  </div>
</section>


<div class="columns is-mobile">
	<div class="column is-one-third is-offset-one-third">
		<div class="container">
			<div class="heading">
				<Login/>
						
			</div>
		</div>
	</div>
</div>


