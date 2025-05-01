import { UrlObject } from 'node:url';

export const parseTypes = (type: string): string => {
  const finalTypes: string[] = [];
  type.split(' ').forEach((type: string) => {
    finalTypes.push('is-' + type);
  });
  return finalTypes.join(' ');
};

export const parseLinkTarget = (link: string | UrlObject): string => {
  const isLinkExternal: boolean = (typeof link === 'string' && (link.startsWith('http://') || link.startsWith('https://')));
  return isLinkExternal ? '_blank' : '_self';
}