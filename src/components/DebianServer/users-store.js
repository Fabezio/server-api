import { writable } from 'svelte/store'

export const users = writable([
  {
    name: "fabezio",
    group: 'wheel',
    avatar: 'Terminal-icon.png',
    root: false,
    job: 'administrator',
    hobbies: ['space science', 'infotech'],
    adage: "we are only stardust"
  }
])
