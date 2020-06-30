import { writable } from 'svelte/store'

export const users = writable([
  {
    name: "fabezio",
    group: 'wheel',
    avatar: 'Terminal-icon.png',
    root: true,
    job: 'administrator',
    hobbies: ['space science', 'infotech'],
    adage: "we are only stardust"
  },
  {
    name: "quidam",
    group: 'quidam',
    avatar: 'openlogo-75.png',
    root: false,
    job: 'rookie',
    hobbies: ['webdev', 'linux'],
    adage: "linux is your fiend"
  }
])
