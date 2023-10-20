'use client'

import {Noto_Serif} from 'next/font/google'
import './header.style.scss'

import React from "react";
import Link from "next/link";

const notoSerif = Noto_Serif({subsets: ['latin']})

const styles: { [key: string]: React.CSSProperties } = {
  navItem: {
    height: '100%',
    padding: '0 24px',
    alignItems: 'center',
    display: 'flex',
    userSelect: 'none',
    cursor: 'pointer',
  },
}

export default function Header() {

  return (
      <div style={{
        position: 'sticky',
        top: 0,
        flex: '0 0 auto',
        width: '100%',
        height: 64,
        background: '#f8f8f8',
        display: 'flex',
        alignItems: 'center',
        color: '#222',
        padding: '0 24px'
      }}>
        <div
            className={notoSerif.className}
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#1e1e8f',
              marginRight: 'auto'
            }}
        >
          SPEED Database
        </div>
        {[
          {label: 'Home', href: '/'},
          {label: 'Moderation', href: '/moderation'},
          {label: 'Analysis', href: '/analysis'},
        ].map(({label, href}) => (
            <Link href={href ?? '/'} className='normal-nav-item' key={label} style={styles.navItem}>
              {label}
            </Link>
        ))}
        <Link
            href='/submitNew'
            className='highlight-nav-item'
            style={{
              textDecoration: 'none',
              marginLeft: 16,
              color: 'white',
              ...styles.navItem,
              ...notoSerif.style,
            }}
        >
          Submit New Article
        </Link>
      </div>
  )
}