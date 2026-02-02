import { BookDashed, BarChart, Orbit, Table, List, FileText, Maximize, User, Pencil, Crop, Share2, Info, Icon  } from "lucide-react"

const SiderbarItems = [
    {label: "Dashboard", Icon: <BookDashed />, href="#"},
    {label: "Charts", Icon: <BarChart />, href: "#"},
    {label: "Widgets", Icon: <Orbit />, href: "#"},
    {label: "Tables", Icon: <Table />, href: "#"},
    {label: "Full Width", Icon: <List />, href: "#"},
    {label: "Forms", Icon: <FileText />, href: "#"},
    {label: "Buttons", Icon: <Maximize />, href: "#"},
    {label: "Icons", Icon: <User />, href: "#"},
    {label: "Elements", Icon: <Pencil />, href: "#"},
    {label: "CropAddons", Icon: <Crop />, href: "#"},
    {label: "Authentication", Icon: <Share2 />, href: "#"},
    {label: "Errors", Icon: <Info />, href: "#"},
]
const Siderbar = () => {
  return (
    <div> 
        {SiderbarItems.map((item) => (
            <a key={item.label} href={item.href}>
                <item.Icon />
                {item.label}
            </a>
        ))}
    </div>
  )
}

export default Siderbar