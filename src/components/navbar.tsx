import Logo from "../assets/svgs/logo.svg";

export const Navbar = () => {
	return (
		<nav className="h-20 w-full px-10 flex items-center bg-camb-primary-100 text-camb-white font-urbanist">
			<div>
				<img src={Logo} alt="camb-ai logo" className="md:h-5 h-4 w-auto" />
			</div>

			<div className="ml-auto flex items-center md:space-x-4 space-x-2">
				<div className="bg-pink-600 md:p-2 p-1 rounded-xl">
					<p className="md:text-xl text-sm font-semibold ">NK</p>
				</div>
				<p className="md:text-xl text-sm font-semibold">Neville Kati</p>
			</div>
		</nav>
	);
};
