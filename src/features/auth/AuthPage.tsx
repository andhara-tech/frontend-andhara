import AuthForm from "./components/form"

const AuthPage = () => {
  return (
    <section className="h-screen flex">
      <figure>
        <img
          src="./auth-cover.jpg"
          alt="Auth Background"
          className="w-full h-full object-cover"
        />
      </figure>
      <AuthForm />
    </section>
  )
}

export default AuthPage