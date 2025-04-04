import AuthForm from "./components/form"

const AuthPage = () => {
  return (
    <section className="h-screen md:flex">
      <figure className="md:w-[70vw] hidden md:block relative">
        <img
          loading="lazy"
          decoding="async"
          src="./img/auth-cover-desktop.jpg"
          alt="Auth Background"
          className="w-full h-full object-cover"
        />
      </figure>
      <section className='md:w-[30vw] flex flex-col justify-center items-center shadow-[13px_4px_8px_-3px_rgba(0,_0,_0,_0.35)]'>
      <figure className="flex flex-col items-center justify-center gap-y-5">
        <img
          loading="lazy"
          decoding="async"
          width={150}
          height={150}
          src="./img/logo.jpg"
          alt="Auth Background"
          className=""
        />
        <figcaption>
          <h2 className="font-bold uppercase text-3xl">Iniciar sesión</h2>
        </figcaption>
        </figure>
        <AuthForm />
      </section>
    </section>
  )
}

export default AuthPage