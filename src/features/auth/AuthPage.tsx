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
      <AuthForm />
    </section>
  )
}

export default AuthPage