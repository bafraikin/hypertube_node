
<template>
	<div>	
		<navbar/>
    <alerts/>
		<div class='container-md'>
			<slot />
		</div>
	</div>
</template>

<script>
import Navbar from './navbar.vue'
import Alerts from './alerts.vue'

export default {
	components: {
    Navbar,
    Alerts
	}
}



</script>
