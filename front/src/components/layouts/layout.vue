
<template>
	<div>	
		<navbar/>
		<div class='container-md'>
			<slot />
		</div>
	</div>
</template>

<script>
import Navbar from './navbar.vue'

export default {
	components: {
		Navbar
	}
}



</script>
