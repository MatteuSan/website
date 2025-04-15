import { Tool } from "@/lib/types";

export const tools: Tool[] = [
  {
    'name': 'Sentro',
    'desc': 'A low-level SCSS library for building and managing token-driven design systems.',
    'slug': 'sentro',
    'status': 'Active',
    'links': {
      'docs': 'https://sentro.matteusan.com',
      'src': 'https://github.com/MatteuSan/sentro'
    },
    'tech': ['SCSS'],
    'tags': ['Library', 'Design System', 'Open Source'],
    'duration': [2020, 'Present']
  },
  {
    'name': 'Himig',
    'desc': 'MatteuSan\'s personal design system for building user interfaces.',
    'status': 'Active',
    'links': {
      'src': 'https://github.com/MatteuSan/himig'
    },
    'tech': ['SCSS', 'TypeScript'],
    'tags': ['Design System', 'Open Source'],
    'duration': [2020, 'Present']
  },
  {
    'name': 'Hashi',
    'desc': 'The web implementation of Dev Protocol\'s design system.',
    'slug': 'hashi',
    'status': 'Active',
    'links': {
      'docs': 'https://hashi-docs.netlify.app',
      'src': 'https://github.com/dev-protocol/hashi',
      'figma': 'https://www.figma.com/community/file/1289131280114725916',
    },
    'tech': ['SCSS', 'TypeScript'],
    'tags': ['Design System', 'Open Source'],
    'duration': [2021, 'Present']
  },
  {
    'name': 'Gaikan',
    'desc': 'An experimental library for building user interfaces made in PHP.',
    'status': 'Hiatus',
    'links': {
      'docs': null,
      'src': 'https://github.com/TeuLabs/Gaikan'
    },
    'tech': ['PHP', 'TypeScript'],
    'tags': ['Library', 'Open Source'],
    'duration': [2020, 2021]
  },
  {
    'name': 'Ugnay',
    'desc': 'SurPath Hub\'s design system implementation for the web.',
    'status': 'Active',
    'links': {
      'docs': 'https://sph-docs.netlify.app/docs/ugnay',
      'src': 'https://github.com/SurPathHub/ugnay-components-web'
    },
    'tech': ['SCSS', 'TypeScript'],
    'tags': ['Design System', 'Open Source'],
    'duration': [2020]
  },
];