import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from '../SidebarData';
import Icon from '@mdi/react';
import { mdiMenu, mdiClose } from '@mdi/js';
import './header.css';

function Header() {

    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const hideSidebar = () => setSidebar(false);
    return (
        <>
            <div className='header'>
                <div className='header_left'>
                    <Icon path={mdiMenu} size={1} onClick={showSidebar} />
                </div>
                <Link className='logo' to="/">FilmArea</Link>
                <div className='header_right'>
                    <Icon path={mdiMenu} size={1} />
                </div>
            </div>
            <nav className={sidebar ? 'sidebar_menu_active' : 'sidebar_menu'}>
                <ul className='sidebar_menu_items' onClick={showSidebar}>
                    <li className='sidebar_toggle'>
                        <Link to='#'>
                            <Icon path={mdiClose} size={1} color="#fff" />
                        </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <div onClick={hideSidebar} className={sidebar ? 'background_sidebar_open' : 'background_sidebar_closed'}></div>
            </nav>
        </>
    )
}

export default Header;