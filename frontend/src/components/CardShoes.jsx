
const CardShoes = ({typeShoe}) => {
    return (
        <div className="flex justify-center items-center flex-col bg-slate-100 w-80 m-4 p-4 border-none rounded-md">
            {console.log(typeShoe)}
            <img src={typeShoe.image} alt="productos" className="w-40"/>
            <p>Name: {typeShoe.name}</p>
            <p>Description: {typeShoe.description}</p>
            <p className="font-bold">{typeShoe.price} €</p>
        </div>
    )
}

export default CardShoes
