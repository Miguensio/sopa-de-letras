import './Nav-styles.css';
import { Link } from 'react-router';

function Navbar(){
	return(
		<nav className="navbar">
			<ul className='nav-menu'>
				<li><Link to='/'>Jugar</Link></li>
				<li><Link to='/HowToPlay'>¿Cómo jugar?</Link></li>
			</ul>
		</nav>
	);
}

export default Navbar;