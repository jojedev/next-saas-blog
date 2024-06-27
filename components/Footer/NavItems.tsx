import Link from 'next/link'
import React from 'react'
import HoverUnderLine from '../nav/HoverUnderLine'

const NavItems = ({navigationItems}: {navigationItems: {name:string, href:string, icon: React.JSX.Element}[]}) => {
  return (
    <ul>
        {navigationItems.map(
            (navItem, index) => (
                <li className='text-white mb-3' key={index}> 
                        <Link className='block w-fit' href={navItem.href}>
                            <HoverUnderLine>
                                <span>
                                    {navItem.name}  
                                </span> 
                            </HoverUnderLine>       
                        </Link>
                </li>

        ))
    }
</ul>
  )
}

export default NavItems