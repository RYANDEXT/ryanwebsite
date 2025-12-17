type ProjectCards = {
    id: number;
    title: string;
    tags: string[];
    src: string;
    websiteUrl: string;
    githubUrl: string;
};

const myProject: ProjectCards[] = [
    {
        id: 1,
        title: 'Ecommerce',
        tags: ['MongoDB', 'Express', 'React', 'Node JS'],
        src: '/images/projects/ecommerceImageGoods.png',
        websiteUrl: 'http://ryanecommercereact.space',
        githubUrl: 'https://github.com/RYANDEXT/ecommerce-project',
    },
    {
        id: 2,
        title: 'Marketlens Stock Tracker App',
        tags: ['NextJS', 'MongoDB', 'Better Auth', 'TypeScript'],
        src: '/images/projects/marketlensStocks1.png',
        websiteUrl: 'https://marketlens-stock-tracker-app-11np.vercel.app/',
        githubUrl: 'https://github.com/RYANDEXT/marketlens-stock-tracker-app',
    },
    {
        id: 3,
        title: 'Note Taking Website Pebble',
        tags: ['MongoDB', 'Express', 'React', 'Node JS'],
        src: '/images/projects/noteTakingPebble.png',
        websiteUrl: 'https://pebble-notes.onrender.com/',
        githubUrl: 'https://github.com/RYANDEXT/pebble-notes',
    },
    {
        id: 4,
        title: 'Mini Movie App',
        tags: ['React', 'Redux', 'Tailwincss'],
        src: '/images/projects/movlix.png',
        websiteUrl: 'https://movlix-vert.vercel.app',
        githubUrl: 'https://github.com/RYANDEXT/movieapp',
    },
];

export default myProject;
