import NextLink from 'next/link';
import {LocaleLinkProps} from '../interfaces/utils';

const Link = ({href, className = '', ...props}: LocaleLinkProps) => (
  <NextLink href={href} className={className} {...props} />
);

export default Link;
