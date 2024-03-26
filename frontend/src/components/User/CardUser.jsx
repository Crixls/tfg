
const CardUser = ({user}) => {
    const roles= user.roles;
  return (
    <div className="flex justify-center items-center flex-col bg-slate-100 w-80 m-4 p-4 border-none rounded-md">
      <p>Nombre: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Roles:</p>
      <ul>
        {roles.map((role, index) => (
          <li key={index}>{role}</li>
        ))}
      </ul>
    </div>
  )
}

export default CardUser
