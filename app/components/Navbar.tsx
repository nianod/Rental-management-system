
const Navbar = () => {

    const navContents = {
        logo: "logoipsum-292.svg",
        title: "Titan Rental"
    }

  return (
    <div className="p-2 "> 
        <div className="flex items-center">
            <img src={navContents.logo} alt="logo" />
            <h1 className="font-bold text-2xl">{navContents.title}</h1>
        </div>
    </div>
  )
}

export default Navbar