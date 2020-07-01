<script>
	import { users } from '../components/DebianServer/users-store'
	import UserHandle from '../components/DebianServer/UserHandle.svelte'

	import Header from '../components/Layouts/Header.svelte'

	import Card from '../components/UI/Card.svelte'
	import Element from '../components/UI/CardElement.svelte'
	import Modal from '../components/UI/Modal.svelte'

	
	let id = 0
	let newId = false
	let attempt = false
	let pagename = 'API Node Server (Debian localhost system)';
	
	let user
	let root
	let group
	let userIsRoot = ''
	let privileges = ''
	let online = true
	let isOn = true
	let alerts

	let username = ''
	let job = ''
	let hobbies = ''
	let value = ''
	let quotation =''
	
	let upSigned = true
	let dispModal = false

	function incrementId() {
		if (id > $users.length ) id = 0
		id++
	}

	function changeUser() {
		newId = true
		incrementId()
		user = $users[id].name
	// $: user = $users[id]
		userIsRoot = ''
		root = $users[id].root
		group = $users[id].group
		newId = false

	}

	function handleAlert() {
		alerts = ""
		online = true 
	}
	function handleRoot () {
		if (group === 'wheel') {
			root = !root
		} else {
			attempt = true
		}
	}

	$: if(id >= $users.length) id = 0
	$: user = $users[id].name
	$: root = $users[id].root
	$: group = $users[id].group

	// $: user = $users[id]
	$: if (value.length) quotation = value
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
	$: if (attempt) {
		setInterval( () => attempt = false, 5000 )
	}
	$: {if(!online) {
		isOn = false 
				alerts = '!'
			}else{
				isOn = true
				alerts = null
			}}
	$: if(!upSigned) console.log('You have to sign up to get minimum privileges.')
	// $: console.log($users[id])
	
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

			<button class="glass" slot='footer' on:click={() => upSigned = true}>Sign up</button>
		</Modal>
	{:else}
		<Header {pagename} />

		<!-- {#if root}
			<label>choose a user : 
				<select bind:value={$users[id].name} name="" id="">
					{#each $users as user}
						 <option value="">{user.name}</option>
					{/each}
				</select>
			</label>
		{:else if $users[id].name} -->
			<label for="">You are logged as <span on:click={changeUser}> {$users[id].name} </span></label>
		<!-- {/if} -->
			

		<section >
			<div class="group">
				<Card>
					<p >user:  <span class={user !== '---' ? 'on' : 'off'}>{user}{userIsRoot}</span></p>
					<p on:click={handleRoot}>privileges:  <span class={ (root) ? "on" : "off"}>{privileges}</span>
					</p>
					{#if alerts }				 
						<div class="alert" on:click={handleAlert}>{alerts}</div>
					{/if}
					<p on:click={() => online = !online}>test: <span class={ online ? "on" : "off"}>{online ? 'OK' : 'failed'}</span></p>
					<p on:click={() => isOn = !isOn}>status: <span class={ isOn ? "on" : "off"}>{isOn? "on" : "off"}</span></p>
					
					{#if attempt }
					<span class="root-alert">root not allowed</span>
					{/if}
				</Card>

				<Card >
				{#if root}
						<p on:click={() => dispModal = true}>see user info</p>
						<p>add user</p>
						<p>update user</p>
						<p>delete user</p>
				{:else}
						<p on:click={() => dispModal = true}>see user info</p>
				{/if}
					</Card>
			</div>

			{#if dispModal}
				<Modal {dispModal}>
					<div slot="title" class="title">
						User Info
					</div>
					<div slot="content" class="data">
						
						{#each $users as user, i}
							{#if i == id}
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
							{/if}
							<!-- content here -->
							
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

	

	p {
		text-align: justify;
		/* color: lightgray; */
	}
	
	button {
	position: absolute;
	right: 2rem;
	/* background: var(--iridescent); */
	/* color: var(--iridescent); */
	font-size: 1rem;
	border-radius: 3px;
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

	.root-alert {
		/* display: inline; */
		position: relative;
		left: 15px;
		font-size: 0.75rem;
		background: rgba(0,0,0, 0.15);
		border-radius: 2px;
		width: auto;
		
		float: left;
		color: red;
		/* cursor: pointer; */
	}
	

	img {
		width: 200px;
		float:left;
	}
	.img, .list {
		padding-left: 0 4rem;
	}
	
	.title {
		color: whitesmoke;
		text-shadow: 0px 0px 1px black;
		font-weight: 500;
	}
</style>