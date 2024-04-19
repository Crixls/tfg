import StickyFooter from "./StickyFooter"


const Footer = () => {
  return (
    <StickyFooter>
      <div  className="relative bottom-0 left-0 w-full h-20 bg-cover bg-center" style={{backgroundImage: 'url(/src/assets/mapa.webp)'}}>
      </div>
    </StickyFooter>

  )
}

export default Footer
