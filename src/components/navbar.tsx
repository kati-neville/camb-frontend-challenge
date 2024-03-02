import Logo from "../assets/svgs/logo.svg";

export const Navbar = () => {
	return (
		<nav className="h-20 w-full px-10 flex items-center bg-camb-primary-100 text-camb-white font-urbanist">
			<div>
				<img src={Logo} alt="camb-ai logo" className="h-5 w-auto" />
			</div>

			<div className="ml-auto flex items-center space-x-4">
				<div className="bg-pink-600 p-2 rounded-xl">
					<p className="text-xl font-semibold">NK</p>
				</div>
				<p className="text-xl font-semibold">Neville Kati</p>
			</div>
		</nav>
	);
};
