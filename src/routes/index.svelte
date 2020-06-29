<script>
	import { users } from '../components/DebianServer/users-store'
	
	import Card from '../components/UI/Card.svelte'
	import Element from '../components/UI/CardElement.svelte'
	import UserHandle from '../components/DebianServer/UserHandle.svelte'
	import Modal from '../components/UI/Modal.svelte'
	let pagename = 'API Node Server (Debian localhost system )';
	let user = $users[0].name
	let userIsRoot = ''
	let root = $users[0].root
	let privileges = ''
	let online = true
	let isOn = true
	let alerts

	let username = ''
	let job = ''
	let hobbies = ''
	let value = ''
	let quotation =''
	$: if (value.length) quotation = value
	
	let upSigned = true
	let dispModal = false

	$: {
		if (!user.length) {
			user = '---'
			privileges = '---'
			userIsRoot = ""
		} else {
			if (!root) {
				privileges = 'normal'
				userIsRoot = ""
			} else {
				privileges = 'root'
				userIsRoot = ' (admin)'
			}
		}
	}

	function handleAlert() {
		alerts = ""
		online = true 
	}
	$: {if(!online) {
		isOn = false 
				alerts = '!'
			}else{
				isOn = true
				alerts = null
			}}
	$: if(!upSigned) console.log('You have to sign up to get minimum privileges.')
	
</script>

<svelte:head>
<title>{pagename}</title>
</svelte:head>

<main>
	{#if !upSigned}
			<Modal>
				<div class="title" slot='title'>
					Fill the form below then click the Sign up button
					
				</div>
				<div slot='content'>
					<form action="">
						
						<input bind:value={username} cols="30" placeholder="name:">
						{username} <br>
						<input bind:value={job} placeholder="job:">
						{job} <br>
						<input bind:value={hobbies} placeholder="hobbies:">
						{hobbies} <br>
						<textarea bind:value name="" id="" cols="30" rows="2" placeholder="quotation here"></textarea>
						{quotation}
					</form>
				</div>

				<button slot='footer' on:click={() => upSigned = true}>Sign up</button>
			</Modal>
	{:else}
		<header>  
			<h1 class="">{pagename}</h1>
		</header>
		<section >
			<div class="group">
				<Card>
					
					
					<p >user:  <span class={user !== '---' ? 'on' : 'off'}>{user}{userIsRoot}</span></p>
					<p on:click={() => root = !root}>privileges:  <span class={ (root) ? "on" : "off"}>{privileges}</span></p>
					{#if alerts }				 
						<div class="alert" on:click={handleAlert}>{alerts}</div>
					{/if}
					<p on:click={() => online = !online}>test: <span class={ online ? "on" : "off"}>{online ? 'OK' : 'failed'}</span></p>
					<p on:click={() => isOn = !isOn}>status: <span class={ isOn ? "on" : "off"}>{isOn? "on" : "off"}</span></p>
					
				</Card>
			
				{#if root}
					<Card>
						<p>add user</p>
						<p on:click={() => dispModal = true}>see user info</p>
						<p>update user</p>
						<p>delete user</p>
					</Card>
				{/if}
			</div>

			{#if dispModal}
				<Modal {dispModal}>
					<div slot="title" class="title">
						User Info
					</div>
					<div slot="content" class="data">
						{#each $users as user}
							<!-- content here -->
								<div class="img">
									<img src="./logos/{user.avatar}" alt="" />
								</div>
								<div class="list">
									<p>Name: {user.name}</p>	
									<p>Group: {user.group}</p>	
									<p>Job: {user.job}</p>	
									<p>Hobbies:
									{#each user.hobbies as hobby}
										<br>- {hobby}
									{/each}
									</p>
									<p>Favorite sentence: 
									<q>{user.adage}</q>
									</p>
								</div>
							
						{/each}
					</div>
					<div slot="footer">
						<button on:click={() => dispModal = false}>close</button>
						<!-- <button on:click={console.log('del')} >delete</button> -->
					</div>
				</Modal>
			{/if}	
		</section>

		<!-- <Footer />	 -->
	{/if}
</main>

<style>	
	/* main {
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
	} */

	header {
		margin: 4rem;
		clear: both;
	}

	p {
		text-align: justify;
		/* color: lightgray; */
	}
	
	
	
	.group {
		display: flex;
	}
	.alert {
		font-size: 0.75rem;
		background: rgba(255,0,0, 0.75);
		border-radius: 50%;
		width: 1rem;
		float:left;
		cursor: pointer;
	}
	

	img {
		width: 200px;
		float:left;
	}
	.img, .list {
		padding-left: 0 4rem;
	}
	button {
		position: absolute;
		right: 2rem;
	}
	.title {
		color: whitesmoke;
		text-shadow: 0px 0px 1px black;
		font-weight: 500;
	}
</style>