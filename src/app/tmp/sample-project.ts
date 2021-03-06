import { ProjectData } from '../shared/project-data';

export const SAMPLE: ProjectData[] = [
  {
    id: 1,
    title: 'Mundus Vestro',
    category: [
      'Web App'
    ],
    github: 'https://github.com/ARW2705/mundus-vestro',
    altLink: 'https://andrewanex.com/mundus-vestro/',
    technology: [
      'html',
      'sass',
      'js',
      'gulp'
    ],
    description: `
      Mundus Vestro (Your World) is an application giving you a quick
      view of various information about the Earth's natural systems. Check the
      current weather and forecasts. Explore recent seismological data. Track the
      International Space Station's orbit overhead.
    `,
    linkHelpText: `
      Navigate to Github to view additional information for the Mundus Vestro
      application
    `,
    preview: {
      src: 'world-preview.jpg',
      alt: 'View of Earth from the International Space Station'
    },
    additionalImages: []
  },
  {
    id: 2,
    title: 'Fermentation Control',
    category: [
      'Arduino'
    ],
    github: 'https://github.com/ARW2705/fermentation-controller',
    altLink: '',
    technology: [
      'c',
      'cpp'
    ],
    description: `
      Temperature control is vital to ensure proper fermentation of
      beer. Able to measure both the chamber temperature as well as the wort
      temperature via a thermowell, this controller can maintain desired
      temperatures by controlling the refrigerant circuit or heating element.
      Internet connectivity coming soon!
    `,
    linkHelpText: `
      Navigate to Github to view additional information about the Fermentation
      Temperature Controller application
    `,
    preview: {
      src: 'fermentation-preview.jpg',
      alt: 'Fermentation vessel and pressure gauge'
    },
    additionalImages: []
  },
  {
    id: 3,
    title: 'Home Automation App',
    category: [
      'Web App',
      'Mobile App',
      'IoT'
    ],
    github: 'https://github.com/ARW2705/homemanagerapp',
    altLink: '',
    technology: [
      'ionic',
      'typescript',
      'socketio'
    ],
    description: `
      Home automation manager at your fingertips. This app provides
      a centralized user interface to control smart processes such as a smart
      thermostat, wifi connected garage door, motion activated security camera,
      and more to come!
    `,
    linkHelpText: `
      Navigate to Github to view additional information about the Home automation
      Manager application
    `,
    preview: {
      src: 'smart-home-preview.jpg',
      alt: 'Control interface with picture icons'
    },
    additionalImages: []
  },
  {
    id: 4,
    title: 'Home Automation Cloud',
    category: [
      'Web Server',
      'IoT'
    ],
    github: 'https://github.com/ARW2705/homemanagercloud',
    altLink: '',
    technology: [
      'nodejs',
      'express',
      'nginx',
      'socketio',
      'mongo'
    ],
    description: `
      Cloud base server solution for home automation needs. Routing
      both HTTP requests and Socket.io messages. A MongoDB database stores home
      sensor data for analysis
    `,
    linkHelpText: `
      Navigate to Github to view additional information about the Home Automation
      Manager Cloud based server
    `,
    preview: {
      src: 'cloud-server-preview.jpg',
      alt: 'Server racks'
    },
    additionalImages: []
  },
  {
    id: 5,
    title: 'Home Automation Hub',
    category: [
      'Web Server',
      'IoT'
    ],
    github: 'https://github.com/ARW2705/homemanagerlocal',
    altLink: '',
    technology: [
      'nodejs',
      'express',
      'socketio',
      'python',
    ],
    description: `
      A central control hub for the smart home. A secure way to
      route messages from IoT devices to the cloud
    `,
    linkHelpText: `
      Navigate to Github to view additional information about the Home Automation
      Manager at-home server
    `,
    preview: {
      src: 'home-hub-preview.jpg',
      alt: 'A home with surrounding examples of Internet of Things appliances'
    },
    additionalImages: []
  },
  {
    id: 6,
    title: 'Security Camera',
    category: [
      'IoT'
    ],
    github: 'https://github.com/ARW2705/Security-Camera',
    altLink: '',
    technology: [
      'socketio',
      'python',
    ],
    description: `
      Utilizing the compact Raspberry Pi Zero W, this camera system
      is capable of recording on command via web sockets or through
      a PIR motion detector
    `,
    linkHelpText: `
      Navigate to Github to view additional information about the Home Security
      Camera application
    `,
    preview: {
      src: 'camera-preview.jpg',
      alt: 'Camera aperture'
    },
    additionalImages: []
  },
  // {
  //   id: 6,
  //   title: 'Smart Thermostat',
  //   category: [
  //     'Arduino',
  //     'IoT'
  //   ],
  //   github: 'https://github.com/ARW2705/homemanagerlocal',
  //   altLink: '',
  //   technology: [
  //     'c',
  //     'cpp',
  //     'socketio',
  //   ],
  //   description: `Utilizing an ESP8266 WiFi module, this thermostat communicates
  //      with the smart home hub to allow remote operation`,
  //   preview: {
  //     src: 'home-hub-preview.jpg',
  //     alt: 'A home with surrounding examples of Internet of Things appliances'
  //   },
  //   additionalImages: []
  // },
]
