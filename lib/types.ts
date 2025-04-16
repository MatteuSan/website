// TODO: Fix this type. Lowkey confusing.
export type Work = {
  name: string,
  desc: string,
  media: string,
  link?: string,
  slug?: string,
  status: 'Active'|'Archived'|'Hiatus',
  tech: string[],
  tags: string[],
  duration: [number, number|'present'|'Present']|[number]
}

// TODO: Fix this type. Lowkey confusing.
export type Tool = {
  name: string,
  desc: string,
  slug?: string,
  status: 'Active'|'Archived'|'Hiatus',
  links?: {
    docs?: string|null,
    src?: string|null,
    figma?: string|null
  },
  tech: string[],
  tags: string[],
  duration: [number, number|'present'|'Present']|[number]
}