import {AnchorHTMLAttributes, ReactNode} from 'react';
import {LinkProps} from 'next/link';
import {ToastPosition} from 'react-toastify';
import {IconType} from 'react-icons';

export interface SidebarRoute {
  value: string;
  label: string;
  path: string;
  icon?: IconType;
  roles: string[];
  children?: SidebarRoute[];
}

export interface SiteMapLink {
  url: string;
  priority: number;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  lastModified: Date;
}

export interface LocaleLinkProps
  extends Omit<LinkProps, 'href'>,
    AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
  children: ReactNode;
}

export interface RequestParams {
  endpoint: string;
  payload?: any;
}

export interface ShowToastProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  message: string;
  id?: string | number;
  position?: ToastPosition | null | undefined;
}

export interface ServerRequestParams {
  endpoint: string;
  cookieHeader?: string;
}
